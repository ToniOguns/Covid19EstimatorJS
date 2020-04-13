import axios from"axios";
const FIELDS={
    "ch-1":["currentlyInfected","infectionsByRequestedTime"],
    "ch-2":["severeCasesByRequestedTime","hospitalBedsByRequestedTime"],
    "ch-3":["casesForICUByRequestedTime","casesForVentilatorsByRequestedTime","dollarsInFlight"]};
    export const randomInt=(e,t=1)=>Math.floor(Math.random()*(e-t+1)+t);
    export const logsSplitr=e=>e.split(/\n+/);export const countLogEntries=(e="",t=logsSplitr)=>t(e).length;
    export const indexOfContentType=(e,t)=>e&&e["content-type"]?e["content-type"].indexOf(t):-1;
    export const getImpactDataStructure=e=>(e?FIELDS[e]:Object.values(FIELDS).flat()).reduce((e,t)=>(e.impact[t]=expect.any(Number),e.severeImpact[t]=expect.any(Number),e),{impact:{},severeImpact:{}});
    export const valueOnFields=(e,t,s)=>(s?FIELDS[s]:Object.values(FIELDS).flat()).reduce((s,o)=>(s.push([e.impact[o],t.impact[o]]),s.push([e.severeImpact[o],t.severeImpact[o]]),s),[]);
    export const mockEstimationFor=async e=>axios.get(`https://us-central1-buildforsdg.cloudfunctions.net/api/gen/covid-19-scenario/${e.toLowerCase()}`);