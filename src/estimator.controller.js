import estimator from './estimator';
import { keepMyLog, filterInput } from './index';

// POST: JSON
export const dataJson = (req, res) => {
  if (!filterInput(req.body)) {
    keepMyLog(req, 400);
    return res.status(400).json({
      status: 'Error',
      message: 'Invalid Input. All values were not provided.'
    });
  }
  const covid19 = estimator(req.body);
  keepMyLog(req, 200);
  return res.status(200).json(covid19);
};

// POST: XML
export const dataXml = (req, res) => {
  if (!filterInput(req.body)) {
    keepMyLog(req, 400);
    return res.status(400).json({
      status: 'Error',
      message: 'Invalid Input. All values were not provided.'
    });
  }
  const { data, impact, severeImpact } = estimator(req.body);
  const {
    region: {
      name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation
    },
    periodType,
    reportedCases,
    totalHospitalBeds,
    population,
    timeToElapse
  } = data;
  const xml = `
    <?xml version='1.0' encoding='UTF-8' ?>
    <root>
      <data>
        <region>
          <name>${name}</name>
          <avgAge>${avgAge}</avgAge>
          <avgDailyIncomeInUSD>${avgDailyIncomeInUSD}</avgDailyIncomeInUSD>
          <avgDailyIncomePopulation>${avgDailyIncomePopulation}</avgDailyIncomePopulation>
        </region>
        <periodType>${periodType}</periodType>
        <timeToElapse>${timeToElapse}</timeToElapse>
        <reportedCases>${reportedCases}</reportedCases>
        <population>${population}</population>
        <totalHospitalBeds>${totalHospitalBeds}</totalHospitalBeds>
      </data>
      <impact>
        <currentlyInfected>${impact.currentlyInfected}</currentlyInfected>
        <infectionsByRequestedTime>${impact.infectionsByRequestedTime}</infectionsByRequestedTime>
        <severeCasesByRequestedTime>${impact.severeCasesByRequestedTime}</severeCasesByRequestedTime>
        <hospitalBedsByRequestedTime>${impact.hospitalBedsByRequestedTime}</hospitalBedsByRequestedTime>
        <casesForICUByRequestedTime>${impact.casesForICUByRequestedTime}</casesForICUByRequestedTime>
        <casesForVentilatorsByRequestedTime>${impact.casesForVentilatorsByRequestedTime}</casesForVentilatorsByRequestedTime>
        <dollarsInFlight>${impact.dollarsInFlight}</dollarsInFlight>
      </impact>
      <severeImpact>
        <currentlyInfected>${severeImpact.currentlyInfected}</currentlyInfected>
        <infectionsByRequestedTime>${severeImpact.infectionsByRequestedTime}</infectionsByRequestedTime>
        <severeCasesByRequestedTime>${severeImpact.severeCasesByRequestedTime}</severeCasesByRequestedTime>
        <hospitalBedsByRequestedTime>${severeImpact.hospitalBedsByRequestedTime}</hospitalBedsByRequestedTime>
        <casesForICUByRequestedTime>${severeImpact.casesForICUByRequestedTime}</casesForICUByRequestedTime>
        <casesForVentilatorsByRequestedTime>${severeImpact.casesForVentilatorsByRequestedTime}</casesForVentilatorsByRequestedTime>
        <dollarsInFlight>${severeImpact.dollarsInFlight}</dollarsInFlight>
      </severeImpact>
    </root>
      `;
  res.type('application/xml');

  keepMyLog(req, 200);
  return res.status(200).send(xml);
};
