
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { FirebaseAdminModuleOptions } from './firebase-admin.module-options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<FirebaseAdminModuleOptions>()
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
