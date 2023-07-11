import FakeProvider from '@App/Core/RemoteProvider/FakeProvider.js'
import MicrosoftProvider from '@App/Core/RemoteProvider/MicrosoftProvider.js'
import HtmlTagPreparator from '@App/Core/RemoteProvider/Preparator/HtmlTagPreparator.js'
import InterpolationPreparator from '@App/Core/RemoteProvider/Preparator/InterpolationPreparator.js'
import NestingPreparator from '@App/Core/RemoteProvider/Preparator/NestingPreparator.js'
import type AbstractProvider from '@App/Core/RemoteProvider/AbstractProvider.js'
import type IPreparator from '@App/Core/RemoteProvider/Preparator/IPreparator.js'
import type { Bootstrap } from '../bootstrap.js'

const bootstrap: Bootstrap = (contaner, config) => {
  contaner.set<IPreparator[]>('IPreparator[]', () => [
    new HtmlTagPreparator(
      /<((?!--)[\s\S])*?(?:--[\s\S]*?(?:--\s*>|$)|\/(?![\s\S]*?<\/)|\?(?![\s\S]*?\?>)[\s\S]*?\?>|[^-\s\d/>][^>"'/]*?(?:\s+[^>"'/][^>"']*?(?:=(?:"[^"]*"|'[^']*'|[^\s'">=]+))?)?\s*\/?)>/gi
    ),
    new InterpolationPreparator(/{{(\d+)}}/g),
    new NestingPreparator(/\$t\([^)]*\)/g),
  ])
  contaner.set<AbstractProvider>('RemoteProvider', () => {
    const remoteProviders = {
      ms: () =>
        new MicrosoftProvider(
          config.msApiKey as string,
          config.msApiRegion as string,
          contaner.get('IPreparator[]')
        ),
      none: () => new FakeProvider(contaner.get('IPreparator[]')),
    }

    const provider = remoteProviders[config.remoteProvider]

    return provider()
  })
}

export default bootstrap
