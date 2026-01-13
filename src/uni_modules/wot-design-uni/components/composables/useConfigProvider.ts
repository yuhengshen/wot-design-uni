import { computed, provide, unref, type Ref } from 'vue'
import { type ConfigProviderDirection, type ConfigProviderThemeVars } from '../wd-config-provider/types'
import { objToStyle } from '../common/util'

export const USE_CONFIG_PROVIDER_KEY = '__CONFIG_PROVIDER__'

export const kebabCase = (str: string): string => {
  str = str.replace(str.charAt(0), str.charAt(0).toLocaleLowerCase())
  return str.replace(/([a-z])([A-Z])/g, (_, p1, p2) => p1 + '-' + p2.toLowerCase())
}

export const mapThemeVarsToCSSVars = (themeVars: Record<string, string>) => {
  if (!themeVars) return
  const cssVars: Record<string, string> = {}
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--wot-${kebabCase(key)}`] = themeVars[key]
  })

  return cssVars
}

export function useConfigProvider({
  themeVars,
  direction
}: {
  themeVars: ConfigProviderThemeVars | Ref<ConfigProviderThemeVars>
  direction: ConfigProviderDirection | Ref<ConfigProviderDirection>
}) {
  const themeStyle = computed(() => {
    const styleObj = mapThemeVarsToCSSVars(unref(themeVars))
    return styleObj ? `${objToStyle(styleObj)}` : ''
  })

  const dir = computed(() => unref(direction) || undefined)

  provide(USE_CONFIG_PROVIDER_KEY, {
    themeStyle,
    direction: dir
  })
}
