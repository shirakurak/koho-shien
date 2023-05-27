function myFunction() {
  const token = "token";
  const slackApp = SlackApp.create(token);
  const channelId = "xxx-times";
  const message = "直近5日の社内広報メールのタイトルです：\n" + getMailTitles();

  Logger.log("post: message");

  slackApp.postMessage(channelId, message);
}

function getMailTitles() {
  Logger.log("start: getMailTitles");

  const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
  const formattedDate = Utilities.formatDate(date, "JST", "yyyy/MM/dd");
  const threads = GmailApp.search("in:anywhere from:(aaa@google.co.jp OR bbb@yahoo.tepco.co.jp) after:" + formattedDate);

  titles = "";
  for (var i = 0; i < threads.length; i++) {
    const message = threads[i].getMessages()[0];
    const subject = message.getSubject();
    titles += subject + "\n";
  }

  return titles;
}
