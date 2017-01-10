import BasePage from './../BasePage';
import getEnvironment from './../../../Environments';


export default class MainPage extends BasePage {
    constructor() {
        super(getEnvironment());
    }

    // Check page existence and title
    pageAccessibilityCheck() {
        return this.getRequest(this.url).then(response =>{
            this.expect(response).to.have.status(200);
            this.expect(response.body).to.contain('GTD');
        });
    }

    // GraphQL access check
    graphQlAccessCheck() {
        this.expect(this.postRequest('post', 'Your Api url here(GraphQL for example)')).to.have.status(200);
        return this.chakramWait();
    }

    // Check favicon existence
    faviconCheck() {
        return this.getRequest(this.url + '/images/favicon.ico').then(response => {
            this.expect(response.body).to.contain('PNG');
        });
    }

    // Check current url on post requests unacceptance
    postReqFailureCheck() {
        this.expect(this.postRequest('post', this.url)).to.have.status(405);
        this.expect(this.postRequest('put', this.url)).to.have.status(405);
        this.expect(this.postRequest('delete', this.url)).to.have.status(405);
        this.expect(this.postRequest('patch', this.url)).to.have.status(405);
        return this.chakramWait();
    }
}
