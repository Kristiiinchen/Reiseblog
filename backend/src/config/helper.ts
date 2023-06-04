// Helper File to read a JSON file and return a parsed Options object
import { readFile } from "fs/promises";
import { Options } from "./options.js";

// export a async function that reads a JSON file and returns a Options object
export async function readOptions(path: string): Promise<Options> {
    // Read the file
    const fileContent = await readFile(path, "utf-8");
    // Parse the file
    const options = JSON.parse(fileContent) as Options;
    // return the options
    return options;
}