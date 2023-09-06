import { Router } from "express";

const meetupsRouter = Router();

meetupsRouter.get("/meetups");
meetupsRouter.post("/meetups");
meetupsRouter.get("/meetups/:id");
meetupsRouter.patch("/meetups/:id");
meetupsRouter.delete("/meetups/:id");

export default meetupsRouter;
