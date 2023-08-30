import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { WebBrowser } from "langchain/tools/webbrowser";
import { LLMDto } from './dto/create-llm.dto';



@Injectable()
export class LlmService {
  async findLocation(dto: LLMDto) {
    try {
      const model = new OpenAI({ modelName: "gpt-4", temperature: 0 });
      const embeddings = new OpenAIEmbeddings();
      const tools = [
        new WebBrowser({ model, embeddings }),
      ];
      const executor = await initializeAgentExecutorWithOptions(tools, model, {
        agentType: "zero-shot-react-description",
        verbose: true,
      });
      const prompt = `
        Find latitude and longitude of ${dto.prompt}.
        Use these following links to find latitude and longitude.
        links: https://www.latlong.net, https://www.latlong.net/place/
        If cant find latitude and longitude with above links try another links.
        Output must be array like following: [51.5072, 0.1276]
      `
      const result = await executor.call({ input: prompt });
      return result
    } catch {
      throw new ServiceUnavailableException()
    }
  }
}

