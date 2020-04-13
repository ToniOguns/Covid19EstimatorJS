import{onCovid19}from"on-covid-19";
import estimator from"./estimator.js";
import{getImpactDataStructure,valueOnFields,mockEstimationFor}from"./test-utils.js";
const cases=[["days","ch-1"],["weeks","ch-1"],["months","ch-1"]];
describe("on-covid-19 >> Challenge-1",()=>{
    test.each(cases)("estimate current and projected infections, in %s",async(t,e)=>{
        const a=await mockEstimationFor(t),{data:o,estimate:s}=a.data,{periodType:c,timeToElapse:i}=o,r=await onCovid19(o,estimator.covid19ImpactEstimator).estimateImpactAfter(i)[c]();expect(r).toBeTruthy(),expect(r).toMatchObject(getImpactDataStructure(e)),valueOnFields(r,s,e).forEach(([t,e])=>{expect(t).toBe(e)})})});
