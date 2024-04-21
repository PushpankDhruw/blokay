import fetch from "node-fetch";

export default class OpenAI {
  private secretKey = process.env.OPENAI_KEY;

  async fetchOpenAI(prompt: string) {
    const endpoint = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.secretKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
        }),
      });

      const data: any = await response.json();

      let res = data.choices?.[0]?.message?.content || "";

      return res;
    } catch (error) {
      console.error("Error al realizar la solicitud a OpenAI:", error);
    }
  }

  async getFn(
    description: string,
    currentFn: string,
    userPrompt: string,
    filters: any[],
    dbStructure: any,
    neurons: any[]
  ) {
    let filtersPrompt = `/* use this filters \n
    ${filters
      .map(
        (field) =>
          `${field.name} = ${field.type} ${
            field.isRequired ? "MANDATORY" : "OPTIONAL"
          }`
      )
      .join("\n")} \n*/`;

    let dbPrompt = `/*   // only uses if you need
    Database schemas
      ${dbStructure.tables
        .map(
          (table: any) =>
            `${table.name} (${table.columns.map((c: any) => c.name).join(",")})`
        )
        .join("\n")} \n*/`;

    let neuronsPrompt = `/*  // only uses if you need
        Neurons keys
        ${neurons
          .map((n) => {
            let fields = n.filters?.fields || [];
            let formStr = `(form: ${fields
              .map((f: any) => f.name)
              .join(", ")})`;

            return `${n.key} ${fields.length > 0 ? formStr : ""} `;
          })
          .join("\n")} \n  */`;

    let prompt = `/*
    Consider the following code to adjust the function \`fn\` taking into account the following instruction:
    
    spanish instructions
    "${userPrompt}"

    Extra Instructions 
    - Respect the types
    - Don't put comments on the code
    - Only write the function \`fn\`
    - Avoid SQL injections
    - Pass exactly the number of the arguments of each function
    */


    ${neurons.length > 0 ? neuronsPrompt : ""}

    ${filters.length > 0 ? filtersPrompt : ""}

    ${dbStructure.tables.length > 0 ? dbPrompt : ""}

    enum CellClick {
      openNeuron = "openNeuron",
    }
    
    type Cell =  string | number | {
      html: string;
      value: string;
      click: CellClick;
      args: {
        neuronKey: string;
        form: Form;
      };
    };
    
    type Row = {
      [x: string | number]: Cell;
    };
    
    type Form = {
      [x: string | number | symbol]: unknown;
    };
    
    type Rows = Row[];
    
    type QueryReplacements = {
      [x: string | number]: unknown;
    };
    
    type FetchParams = {
      [x: string | number | symbol]: unknown;
    };
    
    type ResponseNeuron = {
      type: string;
      message: string;
      content: any;
    };
    
    // only uses if you need
    type Args = {
      // input vars
      form: Form; // values filled by the user
      files: Array<File>; // files uploaded by the user
    
      // database methods
      // example sql replacements value = :value 
      find: (sql: string, replacements: QueryReplacements) => Promise<Row>;
      query: (sql: string, replacements: QueryReplacements) => Promise<Rows>;
      insert: (sql: string, replacements: QueryReplacements) => Promise<void>;
      update: (sql: string, replacements: QueryReplacements) => Promise<void>;
    
      // utils methods
      fetch: (url: string, params: FetchParams) => Promise<any>;
    
      // response methods
      table: (rows: Rows) => ResponseNeuron;
      chartLine: (rows: Rows) => ResponseNeuron; // draw a chart line
      message: (message: string) => ResponseNeuron;
      error: (message: string) => ResponseNeuron;
    };
    
    
    ${description ? `/* ${description} */` : ""}
    
    ${currentFn || "const fn = async (args: Args) => { // complete code }"}
    `;

    console.log(prompt);

    let code = await this.fetchOpenAI(prompt);

    // if it's markdown, extract code
    if (code.includes("```")) {
      code = code.match(/```js(.*)```/)[1];
      code = code.match(/```typescript(.*)```/)[1];
      code = code.match(/```javascript(.*)```/)[1];
    }

    return code;
  }

  async descriptionFn(currentFn: string) {
    let description = await this.fetchOpenAI(`
      /*
      I want to you describe the function \`fn\`

    Extra Instructions 
    - not longer than 150 characters
    - Don't mention technical details
    - Only describes the function for a non-technical user
      */
    ${currentFn}`);

    return description;
  }
}
