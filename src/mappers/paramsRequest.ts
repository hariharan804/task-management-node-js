/**
 * Extracts relevant parameters from a FastifyRequest object.
 *
 * @param {FastifyRequest} request - The FastifyRequest object containing params parameters and URL.
 * @returns  An object containing extracted parameters (id, ....).
 * @throws {Error} Throws an error if there's an issue extracting parameters.
 */
function paramsRequestInfo(request: any) {
  const params = request.params;

  return {
    ...params,
  };
}

export { paramsRequestInfo };
