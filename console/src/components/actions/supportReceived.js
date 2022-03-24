export const SUPPORT_RECEIVED = 'SUPPORT_RECEIVED';
export const supportReceived = (support) => ({
    type: SUPPORT_RECEIVED,
    payload: { support },
});