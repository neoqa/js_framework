/*__________________________ Tests run order __________________________*/

// Connect to different mail services with 1File account
require('./ui/other/UserCreate_Test');
require('./ui/mails/mail_services_connect/onefile_user/OnefileUser_GmailConnect_Test');
require('./ui/mails/mail_services_connect/onefile_user/OneFileUser_YahooConnect_Test');
require('./ui/mails/mail_services_connect/onefile_user/OneFileUser_OutlookConnect_Test');
require('./ui/mails/mail_services_connect/onefile_user/OneFileUser_AolConnect_Test');
require('./ui/mails/mail_services_connect/onefile_user/OneFileUser_ExchangeConnect_Test');
require('./ui/mails/mail_services_connect/onefile_user/OneFileUser_DigitalCaresConnect_Test');

// Work with folders
require('./ui/mails/work_with_folders/FolderCreate_Test');
require('./ui/mails/work_with_folders/FolderEdit_Test');
require('./ui/mails/work_with_folders/SubfolderCreate_Test');
require('./ui/mails/work_with_folders/FolderMoving_Test');
require('./ui/mails/work_with_folders/FolderDeletion_Test');

// Other tests
require('./ui/settings_page/EmailAccountDeletion_Test');
require('./ui/profile_page/UserDeletion_Test');

// Connect to different mail services with Facebook account
require('./ui/mails/mail_services_connect/fb_user/FbUser_GmailConnect_Test');
require('./ui/mails/mail_services_connect/fb_user/FbUser_YahooConnect_Test');
require('./ui/mails/mail_services_connect/fb_user/FbUser_OutlookConnect_Test');
require('./ui/mails/mail_services_connect/fb_user/FbUser_AolConnect_Test');
require('./ui/mails/mail_services_connect/fb_user/FbUser_ExchangeConnect_Test');
require('./ui/mails/mail_services_connect/fb_user/FbUser_DigitalCaresConnect_Test');

// Connect to different mail services with Gmail account
require('./ui/mails/mail_services_connect/gmail_user/GmailUser_GmailConnect_Test');
require('./ui/mails/mail_services_connect/gmail_user/GmailUser_YahooConnect_Test');
require('./ui/mails/mail_services_connect/gmail_user/GmailUser_OutlookConnect_Test');
require('./ui/mails/mail_services_connect/gmail_user/GmailUser_AolConnect_Test');
require('./ui/mails/mail_services_connect/gmail_user/GmailUser_ExchangeConnect_Test');
require('./ui/mails/mail_services_connect/gmail_user/GmailUser_DigitalCaresConnect_Test');
