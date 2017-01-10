import BaseTest from '../../core/webdriver/BaseTest';
import DbConnection from './../../core/db/DbConnection';

// Test actions
function testBody() {
    BaseTest.test.it("Should connect to MongoDb and query category by specified title", () => {
        DbConnection.executeQuery(DbConnection.testQuery);
    });
}

// Initiate test run
BaseTest.testIt("Test MongoDb connection", testBody);