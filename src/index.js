import estimator from './estimator';

const fs = require('fs');

const filterInput = (data) => {
  if (!data) return false;
  // Destructuring the given data
  const {
    region: {
      name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = data;

  if (!name || !avgAge || !avgDailyIncomeInUSD || !avgDailyIncomePopulation
    || !periodType || !timeToElapse
    || !reportedCases || !population || !totalHospitalBeds
  ) {
    return false;
  }
  return true;
};

const keepMyLog = (req, responseStatusCode) => {
  const { keepLog } = req;
  keepLog.ktime = Date.now();
  keepLog.kcode = responseStatusCode;
  const {
    kmethod, kpath, kcode, stime, ktime
  } = keepLog;
  fs.appendFile(
    `${__dirname}/logs.txt`,
    `${kmethod}\t${kpath}\t${kcode}\t${ktime - stime} ms \n`,
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
};

// Get: display welcome message
const welcome = (req, res) => {
  keepMyLog(req, 200);
  res.status(200).send('<h4>Welcome to covid-19-estimator-api</h4>');
};
// POST: JSON
const dataJson = (req, res) => {
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
const dataXml = (req, res) => {
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

// GET: logs
const logs = (req, res) => {
  fs.readFile(`${__dirname}/logs.txt`, 'utf8', (err, data) => {
    if (err) throw err;
    res.set('Content-Type', 'text/plain');
    keepMyLog(req, 200);
    res.status(200).send(data);
  });
};

module.exports = {
  welcome,
  dataJson,
  dataXml,
  logs
};
