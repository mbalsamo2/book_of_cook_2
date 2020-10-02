if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_the-book-of-cook', domain: 'your-frontend-domain' # change once domain name has been chosen
else
  Rails.application.config.session_store :cookie_store, key: '_the-book-of-cook'
end
