import { assertEquals, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";

import { filterHabitablePlanets } from "../models/planets.ts";

const HABITABLE_PLANET = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const NOT_CONFIRMED = {
  koi_disposition: "FALSE POSITIVE",
};

const TOO_LARGE_PLANETARY_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.02",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_MASS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};


Deno.test({
    name: "Sample type2 testing",
    fn() {
        assertEquals("node", "node");
        assertNotEquals({
            runtime: "deno",
        }, {
            runtime: "node",
        })
    }
});

Deno.test({
    name: "Filter only habitable planets",
    fn: () => {
        const planets = filterHabitablePlanets([
            HABITABLE_PLANET,
            NOT_CONFIRMED,
            TOO_LARGE_PLANETARY_RADIUS,
            TOO_LARGE_SOLAR_RADIUS,
            TOO_LARGE_SOLAR_MASS
        ]);

        assertEquals(planets, [
            HABITABLE_PLANET
        ]);
    }
})

// Deno.test({
//     name: "ops leak",
//     sanitizeOps: false,
//     fn() {
//         setTimeout(log.info, 10000);
//     }
// });

// Deno.test({
//     name: "resource leak",
//     sanitizeResources: false,
//     async fn() {
//         await Deno.open("../models/planets.ts");
//     }
// });