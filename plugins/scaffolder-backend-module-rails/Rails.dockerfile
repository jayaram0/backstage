FROM ruby:3.3@sha256:fb9d97f39ada3ff3ed0f1d04fc94efb59490c6c519f468b54a91e48de9ea0ec5

RUN apt-get update -qq && \
    apt-get install -y nodejs postgresql-client git && \
    rm -rf /var/lib/apt/lists/

RUN gem install rails
