import fetch from "node-fetch";

export default class Core {
  private secretKey = process.env.BLOKAY_API_KEY;

  async fetchCore(path: string, data: any) {
    const endpoint = process.env.CORE_URL || "https://blokay.com";

    const response = await fetch(endpoint + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.secretKey}`,
      },
      body: JSON.stringify({
        data,
      }),
    });

    const result: any = await response.json();

    return result;
  }

  async getFn(
    description: string,
    synapse: string,
    prompt: string,
    fields: any[],
    structure: any,
    neuronList: any[]
  ) {
    let result = await this.fetchCore("/api/ai/exec", {
      description,
      synapse,
      prompt,
      fields,
      structure,
      neuronList,
    });

    result = result.data.Result;

    return {
      description: result.description,
      synapse: result.synapse,
    };
  }
}