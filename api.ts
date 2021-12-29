import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";

import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = `
███╗░░██╗░█████╗░░██████╗░█████╗░
████╗░██║██╔══██╗██╔════╝██╔══██╗
██╔██╗██║███████║╚█████╗░███████║
██║╚████║██╔══██║░╚═══██╗██╔══██║
██║░╚███║██║░░██║██████╔╝██║░░██║
╚═╝░░╚══╝╚═╝░░╚═╝╚═════╝░╚═╝░░╚═╝`;
});

router.get("/planets", (ctx) => {
    ctx.response.body = planets.getAllPlanets();
})

router.get("/launches", (ctx) => {
    ctx.response.body = launches.getAllLaunches();
})

router.get("/launches/:id", (ctx) => {
    if(ctx.params?.id) {
        const launchesList = launches.getOneLaunch(Number(ctx.params.id));
        if(launchesList) {
            ctx.response.body = launchesList;
        } else {
            ctx.throw(400, "Launch with that ID doesn't exist.");
        }
    }
})

router.post("/launches", async(ctx) => {
    const body = await ctx.request.body();

    launches.addLaunch(body.value);

    ctx.response.body = { success: true };
    ctx.response.status = 201;
})

export default router;