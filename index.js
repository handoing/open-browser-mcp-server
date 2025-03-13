import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import open, { apps } from 'open';

const server = new McpServer({
    name: "openBrowser",
    version: "1.0.0",
});

server.tool(
    "open-browser",
    "Open the browser and visit the specified website address",
    {
        url: z.string().describe("Website address (e.g. https://www.baidu.com, https://www.google.com)"),
    },
    async ({ url }) => {

        try {
            await open(url, {
                app: {
                    name: apps.chrome
                }
            });
        } catch (e) {
            return {
                content: [
                    {
                        type: "text",
                        text: "The browser failed to open",
                    },
                ],
            };
        }

        return {
            content: [
                {
                    type: "text",
                    text: "The browser has been successfully opened",
                },
            ],
        };
    },
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("OpenBroswer MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});