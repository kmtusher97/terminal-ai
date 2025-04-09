import { logger } from "./logger";
import { getGitInfo } from "./utils/git-info";
import { getSystemInfoFromOS } from "./utils/system-info";

const getSystemPrompt = async (context: string) => {
  const BasePrompt = `
  You are a helpful terminal assistant. Convert natural language requests into terminal commands. 
  Use the provided context to inform your command generation. 
  use the \`execute_command\` function to execute terminal commands.
  if user asks question that is not related to terminal commands respond user question.

  SYSTEM INFORMATION:
  ${getSystemInfoFromOS()}
  `;


  const gitInfo = await getGitInfo();
  let fullContext = context || '';

  if (gitInfo) {
    fullContext = fullContext ? `${fullContext}\n\n${gitInfo}` : gitInfo;
  }

  if (fullContext) {
    logger.debug(`With context: ${fullContext}`);
  }

  return `${BasePrompt}\n\n${fullContext}`;
};

export default getSystemPrompt;
