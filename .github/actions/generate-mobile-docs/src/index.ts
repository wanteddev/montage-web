import Android from './modules/android';
import IOS from './modules/ios';

const MODULES: Record<string, typeof Android | typeof IOS | undefined> = {
  android: Android,
  ios: IOS,
};

const run = async () => {
  const platform = process.env.INPUT_PLATFORM ?? '';
  const Module = MODULES[platform];

  if (!Module) {
    throw new Error(`Unknown platform: ${platform}`);
  }

  (await new Module().gitClone()).load().convert().save().cleanup();
};

run();
