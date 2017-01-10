export default class CommonActions {
    // Check current url on post requests unacceptance
    static postReqFailureCheck(chakram, url) {
        postRequest(chakram, 'post', url).then((response) =>{
            expect(response).to.have.status(406);});
        postRequest(chakram, 'put', url).then((response) =>{
            expect(response).to.have.status(406);});
        postRequest(chakram, 'delete', url).then((response) =>{
            expect(response).to.have.status(406);});
        postRequest(chakram, 'patch', url).then((response) =>{
            expect(response).to.have.status(406);});
    }

    // Facebook user deletion
    static facebook_UserDelete(code){
        return chakram.post('http://api.your_url.com/graphql?query=mutation{socialLogin(type:"FB",code:"' + code +'",timezoneOffset:-120){accessToken{accessToken}},removeUser{result}}').then(response => {
            chakram.expect(response).to.have.status(200);
            chakram.expect(response.body.data.removeUser["result"]).to.eql(true);
        });
    }

    // Gmail user deletion
    static gmail_UserDelete(code){
        return chakram.post('http://api.your_url.com/graphql?query=mutation{socialLogin(type:"GMAIL",code:"' + code +'",timezoneOffset:-120){accessToken{accessToken}},removeUser{result}}').then(response => {
            chakram.expect(response).to.have.status(200);
            chakram.expect(response.body.data.removeUser["result"]).to.eql(true);
        });
    }

    // User deletion
    static oneFile_UserDelete(){
        return chakram.post('http://api.your_url.com/graphql?query=mutation{login(email:"your_email",password:"123456"){accessToken{accessToken}},removeUser{result}}').then(response => {
            chakram.expect(response).to.have.status(200);
            chakram.expect(response.body.data.removeUser["result"]).to.eql(true);
        });
    }

    // Mail account delete
    static oneFile_AccountDelete(){
        // Get account [id] then delete it
        return chakram.post('http://api.your_url.com/graphql?query=mutation{login(email:"your_email",password:"123456"){user{accounts {id}}}}').then(response => {
            chakram.expect(response).to.have.status(200);

            // Account deletion
            // If there is no id passed, then next error will be shown: 'Cannot read property 'id' of undefined'
            chakram.post('http://api.your_url.com/graphql?query=mutation{login(email:"your_email",password:"123456"){},removeAccount(id:' + response.body.data.login.user.accounts[0]["id"] + '){id}}').then(deleteResponse => {
                chakram.expect(deleteResponse).to.have.status(200);
            });
        });
    }
}