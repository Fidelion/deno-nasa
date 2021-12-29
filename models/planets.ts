import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";
import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/lodash.js";
import * as log from "https://deno.land/std/log/mod.ts";


// interface Planet {
//     [key : string]: string
// };

type Planet = Record<string, string>;

let planets: Array<Planet>;

export const filterHabitablePlanets = (planets: Array<Planet>) => {
    return planets.filter((planet) => {
        const planetaryRadius = Number(planet["koi_prad"]);
        const stellarMass = Number(planet["koi_smass"]);
        const stellarRadius = Number(planet["koi_srad"]);

        return planet["koi_disposition"] === "CONFIRMED" &&
        planetaryRadius > 0.5 && planetaryRadius < 1.5 &&
        stellarMass > 0.78 && stellarMass < 1.04 &&
        stellarRadius > 0.99 && stellarRadius < 1.01;
    });
}

const loadPlanetsData = async () => {
	const path = join("data", "kepler_exoplanets_nasa.csv");
    const file = await Deno.open(path);
    const buffer = new BufReader(file);

	const result = await parse(buffer, {
        skipFirstRow: true,
        comment: '#'
    });

    Deno.close(file.rid);

    const planets = filterHabitablePlanets(result as Array<Planet>);

	return planets.map((planet) => {
        return _.pick(planet,
            "koi_prad",
            "koi_smass",
            "koi_srad",
            "kepler_name",
            "koi_count",
            "koi_steff"
        );
    });
};

planets = await loadPlanetsData();

log.info(`You've found ${planets.length} habitable planets`);

for(let earth of planets) {
    log.info(earth);
    log.info("Shortest orbital period", )
};

export const getAllPlanets = () => {
    return planets;
};