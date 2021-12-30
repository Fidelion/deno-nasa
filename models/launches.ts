import {
    log,
    _
} from "../src/deps.ts";

export interface Launch {
    flightNumber: number;
    mission: string;
    rocket: string;
    customers: Array<string>;
    launchDate: number;
    upcoming: boolean;
    success?: boolean;
    target?: boolean;
}

const launches = new Map<number, Launch>();

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
  },

    loggers: {
    // configure default logger available via short-hand methods above.
    default: {
        level: "DEBUG",
        handlers: ["console"],
    },
    },
});

export const downloadData = async() => {
    log.info("Downloading data...");
    const response = await fetch("https://api.spacexdata.com/v3/launches", {
        method: "GET"
    });

    if(!response.ok) {
        log.error("Something happened with your request.");
        throw new Error("Launch data download failed.");
    }

    const launchData = await response.json();

    for(const launch of launchData) {
        const payloads = launch["rocket"]["second_stage"]["payloads"];
        const customers = _.flatMap(payloads, (payload: any) => {
            return payload["customers"];
        });
        const flightData = {
            flightNumber: launch["flight_number"],
            mission: launch["mission_name"],
            rocket: launch["rocket"]["rocket_name"],
            launchDate: launch["launch_date_unix"],
            upcoming: launch["upcoming"],
            success: launch["launch_success"],
            customers
        }

        launches.set(flightData.flightNumber, flightData);

        log.info(JSON.stringify(flightData));
    }
    // console.log(launchData);
}

await downloadData();
log.info(`Downloaded data for ${launches.size} SpaceX Launches.`);

export const getAllLaunches = () => {
    return Array.from(launches.values());
}

export const getOneLaunch = (id: number) => {
    if (launches.has(id)){
        return launches.get(id);
    }
    return null;
}

export const addLaunch = (data: Launch) => {
    launches.set(data.flightNumber, Object.assign(data, {
        upcoming: true,
        customers: ["ZTM", "NASA"]
    }));
}

export const removeLaunch = (id: number) => {
    const aborted = launches.get(id);
    if(aborted) {
        aborted.upcoming = false;
        aborted.success = false;
    }
    return aborted;
}