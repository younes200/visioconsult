import storage from './storage';
import fetchJson from './fetch'


export const authClient = (loginApiUrl, noAccessPage = '/login') => {

	return (type, params) => {
		if (type === 'AUTH_LOGIN') {
			const request = new Request(loginApiUrl, {
				method: 'POST',
				body: JSON.stringify(params),
				headers: new Headers({
					'Content-Type': 'application/json'
				}),
			});

			return fetch(request)
				.then(response => {
					if (response.status < 200 || response.status >= 300) {
						throw new Error(response.statusText);
					}
					return response.json();
				})
				.then(({
					ttl,
					user,
					...data
				}) => {
					if (!user.roles.length > 0 || user.roles[0].name != 'admin') {
						throw new Error('Permission denied')
					}
					storage.save('lbtoken', data, ttl);
				});
		}
		if (type === 'AUTH_LOGOUT') {
			storage.remove('lbtoken');
			return Promise.resolve();
		}
		if (type === 'AUTH_ERROR') {
			const status = params.message.status;
			if (status === 401 || status === 403) {
				storage.remove('lbtoken');
				return Promise.reject();
			}
			return Promise.resolve();
		}
		if (type === 'AUTH_CHECK') {
			
			const token = storage.load('lbtoken');
			if (token && token.id) {
				// return Promise.resolve();

				if (token && token.id) {
					
					const request = new Request(`${process.env.API_URL}/users/me`, {
						method: 'GET',
						headers: new Headers({
							'Content-Type': 'application/json',
							'Authorization': token.id
						}),
					});
		
					return fetch(request)
						.then(response => {
							if (response.status < 200 || response.status >= 300) {
								storage.remove('lbtoken');
								return Promise.reject({
									redirectTo: noAccessPage
								});
							}else{
								return Promise.resolve();
							}
						})

				} else {
					storage.remove('lbtoken');
					return Promise.reject({
						redirectTo: noAccessPage
					});
				}

			} else {
				storage.remove('lbtoken');
				return Promise.reject({
					redirectTo: noAccessPage
				});
			}
		}
		return Promise.reject('Unknown method');
	};
};