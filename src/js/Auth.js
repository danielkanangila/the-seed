import firebase, { auth } from 'firebase'

class Auth {
    constructor () {
        this.user = null
    }
    check_email (context) {
        context.$validator.validateAll()
            .then((response) => {
                if (response === true) {
                    context.btnTitle = 'Connection...'
                    context.isProcess = true
                    firebase.auth().fetchProvidersForEmail(context.auth.email)
                    .then((res) => {
                      if (res.length >= 1) {
                        context.auth.hasErrors = false
                        context.btnTitle = 'Next'
                        context.step = 2
                        context.isProcess = false
                      }
                      else {
                        context.auth.hasErrors = true
                        context.auth.message = 'This email doesn\'t registered.'
                        context.btnTitle = 'Next',
                        context.isProcess = false
                      }
                    })
                    .catch((err) => {
                      console.log(error)
                    })
                } else {
                    context.auth.hasErrors = true
                    context.auth.message = context.errors.first('email')
                }
            })
    }
    confirm (context) {
        if (context.auth.password.length === 0) {
            context.auth.hasErrors = true
            context.auth.message = 'Password is required'
            return 
        }
        context.btnTitle = 'Connection...'
        context.isProcess = true
        firebase.auth().signInWithEmailAndPassword(context.auth.email, context.auth.password)
            .then((user) => {
                context.$toast.success({
                    title: 'Successful login.',
                    message: 'Welcome to the TheSeed Admin!',
                    color: '#51A351'
                })
                window.isAuthorizedUser = false
                window.user = user
                context.$router.push({name: 'admin'})
                context.btnTitle = 'Next',
                context.isProcess = false
            },
            (error) => {
                context.auth.hasErrors = true
                context.auth.message = error.message
                context.btnTitle = 'Next',
                context.isProcess = false
            } 
        )
    }
    getUser () {
        return this.user
    }
    logout (context) {
        firebase.auth().signOut().then(() => {
            context.$router.push({name: 'home'})
        })
    }
}

export default new Auth()