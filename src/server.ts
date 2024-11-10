import app from "./app";
import { configs } from "./configs";

app.listen(configs.server.port, () => {
  console.log(`Server is running on port ${configs.server.port}`);
});