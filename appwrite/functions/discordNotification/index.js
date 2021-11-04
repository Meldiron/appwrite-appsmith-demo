const axios = require("axios");

(async () => {
  const discordUrl = process.env.DISCORD_WEBHOOK_URL;

  const payload = JSON.parse(process.env.APPWRITE_FUNCTION_EVENT_DATA);

  const projectName = payload.title;
  const projectDescription = payload.description;
  const projectUrl = payload.githubUrl;

  const discordJson = {
    content: `Project **${projectName}** has been published on https://appwrite-appsmith-demo.vercel.app/app`,
    embeds: [
      {
        title: projectName,
        description: projectDescription,
        url: projectUrl,
        color: 5814783,
      },
    ],
  };

  await axios.post(discordUrl, discordJson);
})()
  .then(() => {
    console.log("Discord message sent.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.toJSON());
    console.error("Could not send Discord message.");
    process.exit(1);
  });
