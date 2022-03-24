FROM alpine:3.8

LABEL maintainer="Younes Benaomar <younes@interactive-object.com>" \
      description="Eclipse Mosquitto MQTT Broker with Auth-Plugin"

ENV VERSION=1.5.5 \
    DOWNLOAD_SHA256=fcdb47e340864c545146681af7253399cc292e41775afd76400fda5b0d23d668 \
    GPG_KEYS=A0D6EEA1DCAE49A635A3B2F0779B22DFB3E717B7 \
    LWS_VERSION=2.4.2

RUN set -x && \
    apk --no-cache add --virtual build-deps \
        git \
        build-base \
        cmake \
        gnupg \
        libressl-dev \
        curl-dev \
        util-linux-dev && \
    apk --no-cache add openssl \
        libressl \
        c-ares-dev && \
    wget https://github.com/warmcat/libwebsockets/archive/v${LWS_VERSION}.tar.gz -O /tmp/lws.tar.gz && \
    mkdir -p /build/lws && \
    tar --strip=1 -xf /tmp/lws.tar.gz -C /build/lws && \
    rm /tmp/lws.tar.gz && \
    cd /build/lws && \
    cmake . \
        -DCMAKE_BUILD_TYPE=MinSizeRel \
        -DCMAKE_INSTALL_PREFIX=/usr \
        -DLWS_IPV6=ON \
        -DLWS_WITHOUT_BUILTIN_GETIFADDRS=ON \
        -DLWS_WITHOUT_CLIENT=ON \
        -DLWS_WITHOUT_EXTENSIONS=ON \
        -DLWS_WITHOUT_TESTAPPS=ON \
        -DLWS_WITH_SHARED=OFF \
        -DLWS_WITH_ZIP_FOPS=OFF \
        -DLWS_WITH_ZLIB=OFF && \
    make -j "$(nproc)" && \
    rm -rf /root/.cmake && \
    wget https://mosquitto.org/files/source/mosquitto-${VERSION}.tar.gz -O /tmp/mosq.tar.gz && \
    echo "$DOWNLOAD_SHA256  /tmp/mosq.tar.gz" | sha256sum -c - && \
    wget https://mosquitto.org/files/source/mosquitto-${VERSION}.tar.gz.asc -O /tmp/mosq.tar.gz.asc && \
    export GNUPGHOME="$(mktemp -d)" && \
    found=''; \
    for server in \
        ha.pool.sks-keyservers.net \
        hkp://keyserver.ubuntu.com:80 \
        hkp://p80.pool.sks-keyservers.net:80 \
        pgp.mit.edu \
    ; do \
        echo "Fetching GPG key $GPG_KEYS from $server"; \
        gpg --keyserver "$server" --keyserver-options timeout=10 --recv-keys "$GPG_KEYS" && found=yes && break; \
    done; \
    test -z "$found" && echo >&2 "error: failed to fetch GPG key $GPG_KEYS" && exit 1; \
    gpg --batch --verify /tmp/mosq.tar.gz.asc /tmp/mosq.tar.gz && \
    gpgconf --kill all && \
    rm -rf "$GNUPGHOME" /tmp/mosq.tar.gz.asc && \
    mkdir -p /build/mosq && \
    tar --strip=1 -xf /tmp/mosq.tar.gz -C /build/mosq && \
    rm /tmp/mosq.tar.gz && \
    make -C /build/mosq -j "$(nproc)" \
        CFLAGS="-Wall -O2 -I/build/lws/include -flto" \
        LDFLAGS="-L/build/lws/lib -flto" \
        WITH_ADNS=no \
        WITH_DOCS=no \
        WITH_MEMORY_TRACKING=no \
        WITH_SRV=yes \
        WITH_STRIP=no \
        WITH_TLS_PSK=no \
        WITH_WEBSOCKETS=yes \
        prefix=/usr \
        binary \
    install && \
    addgroup -S -g 1883 mosquitto 2>/dev/null && \
    adduser -S -u 1883 -D -H -h /var/empty -s /sbin/nologin -G mosquitto -g mosquitto mosquitto 2>/dev/null && \
    mkdir -p /mosquitto/config /mosquitto/data /mosquitto/log && \
    install -s -m755 /build/mosq/src/mosquitto mosquitto && \
    install -s -m755 /build/mosq/src/mosquitto_passwd /usr/bin/mosquitto_passwd && \
    install -m644 /build/mosq/mosquitto.conf /mosquitto/config/mosquitto.conf && \
    chown -R mosquitto:mosquitto /mosquitto && \
    apk --no-cache add \
        libuuid && \
    echo "Setting Auth Plug" && \
    mkdir -p /build/auth-plug && \
    cd /build/auth-plug && \
    git clone https://github.com/jpmens/mosquitto-auth-plug.git && \
    cd mosquitto-auth-plug && \
    cp config.mk.in config.mk && \
    sed -i "s:MOSQUITTO_SRC =:MOSQUITTO_SRC = /build/mosq:" config.mk && \
    sed -i "s/BACKEND_HTTP ?= no/BACKEND_HTTP ?= yes/" config.mk && \
    sed -i "s/BACKEND_JWT ?= no/BACKEND_JWT ?= yes/" config.mk && \
    sed -i "s/BACKEND_MYSQL ?= yes/BACKEND_MYSQL ?= no/" config.mk && \
    sed -i "s/BACKEND_REDIS ?= yes/BACKEND_REDIS ?= no/" config.mk && \
    sed -i "s/BACKEND_POSTGRES ?= yes/BACKEND_POSTGRES ?= no/" config.mk && \
    sed -i "s:#if OPENSSL_VERSION_NUMBER://if OPENSSL_VERSION_NUMBER:" cache.c && \
    sed -i "s:#else://else:" cache.c && \
    sed -i 's:EVP_MD_CTX \*mdctx = EVP_MD_CTX_new://EVP_MD_CTX \*mdctx = EVP_MD_CTX_new:' cache.c && \
    sed -i "s:#endif://endif:" cache.c && \
    sed -i "s:EVP_MD_CTX_free://EVP_MD_CTX_free:" cache.c && \
    make && \
    install -s -m755 auth-plug.so /usr/local/lib/ && \
    apk del build-deps && \
    rm -rf /build

VOLUME ["/mosquitto/data", "/mosquitto/log"]


# Set up the entry point script and default command
COPY docker-entrypoint.sh /
RUN chown root:root /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["mosquitto", "-c", "/mosquitto/config/mosquitto.conf"]