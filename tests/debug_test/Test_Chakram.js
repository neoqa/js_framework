import Main_Page from '../../core/chakram/pages/app/MainPage';

before(() => {
});

describe("Test GTD main page", () => {
    // Page object
    let mainPage = new Main_Page();

    it("Should check access and assert title", () => {
        return mainPage.pageAccessibilityCheck();
    });

    it("Should check access to GraphQl", () => {
        return mainPage.graphQlAccessCheck();
    });

    it("Should only support GET calls", () => {
        return mainPage.postReqFailureCheck();
    }).timeout(4000);

    it("Should check favicon existence", () => {
       return mainPage.faviconCheck();
    });
});

after(() => {
});