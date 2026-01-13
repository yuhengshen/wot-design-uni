import { useParent } from './useParent'
import { computed } from 'vue'
import { CONFIG_PROVIDER_KEY } from '../wd-config-provider/types'

export const useDirection = () => {
  const { parent: configProvider } = useParent(CONFIG_PROVIDER_KEY)

  const isRtl = computed(() => {
    return configProvider?.direction?.value === 'rtl'
  })

  return { isRtl }
}
