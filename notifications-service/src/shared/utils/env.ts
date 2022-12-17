export const env = {
  getOrThrow(environmentVariableKey: string) {
    const environmentVariableValue = process.env[environmentVariableKey];
    if (!environmentVariableValue) {
      throw new Error(
        `Environment variable with key \`${environmentVariableKey}\` is missing.`
      );
    }

    return environmentVariableValue;
  },
};
