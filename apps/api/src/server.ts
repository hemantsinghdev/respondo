import app from "./app";

const start = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT),
      host: "0.0.0.0",
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
