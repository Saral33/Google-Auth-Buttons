import React from 'react';


class GoogleAuth extends React.Component{
state={
    isSignedIn:null
};

    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '221667037089-bbgcqa371rm8id1ps6vsnciqbnumn945.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth= window.gapi.auth2.getAuthInstance();
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get(),
                });
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        
        });
    };

    onSignOutClick=()=>{
        this.auth.signOut();
    }

    onSignInClick=()=>{
        this.auth.signIn();
    }

    onAuthChange= ()=>{
        this.setState({
            isSignedIn: this.auth.isSignedIn.get()
        })
    }
    renderAuthButton(){
        if(this.state.isSignedIn===null){
            return null;
        }
        else if (this.state.isSignedIn){
            return(
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        }
        else{
            return(
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon"/>
                    Sign In With Google
                </button>
            )
        }
    }
    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        )
    }
}


export default GoogleAuth;


