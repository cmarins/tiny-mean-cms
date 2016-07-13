((app) => {

    app.service('UserService', class UserService {

        constructor($http, $cookies, $window) {
            this.$http = $http
            this.$cookies = $cookies
            this.$window = $window
            this.currentUser = null
        }

        connect(data) {
            return new Promise((resolve, reject) => {
                this.$http.post('/api/login', data).then((res) => {
                    this.currentUser = res.data.user
                    this.$cookies.put('token', res.data.token)
                    resolve(res.data)
                }).catch(() => {
                    reject()
                })
            })

            return this.$http.post('/api/login', data)
        }

        disconnect() {
            return this.$http.post('/api/logout')
        }

        getAll() {
            return this.$http.get('/api/users')
        }

        create(user) {
            return this.$http.post('/api/users', user)
        }

        getCurrent() {
            return new Promise((resolve, reject) => {
                if (!this.currentUser){
                  let payload = this.$cookies.get('token').split('.')[1]
                  payload = this.$window.atob(payload)
                  payload = JSON.parse(payload)
                  this.currentUser = payload._doc
                }

                resolve(this.currentUser)
            })
        }

    })
})(angular.module('app.services'))
