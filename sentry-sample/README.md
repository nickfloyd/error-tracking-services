### Setup

1. Create an account on [sentry.io](https://sentry.io/)
2. `git clone git@github.com:nickfloyd/error-tracking-services.git`
3. Add env vars
  * `REACT_APP_SENTRY_ORG`
    * ex. `export REACT_APP_SENTRY_ORG=CompanyName`
  * `REACT_APP_SENTRY_PROJECT`
    * ex. `export REACT_APP_SENTRY_PROJECT=my-app`
  * `REACT_APP_SENTRY_RAVEN_ENDPOINT`
    * ex. `export REACT_APP_SENTRY_RAVEN_ENDPOINT=https://mykey@sentry.io/111111`
  * `REACT_APP_SENTRY_API_KEY`
    * ex. `export REACT_APP_SENTRY_API_KEY=1111111111111111111111111111111111111111`
4. `npm i && npm run build`
5. `npm start`