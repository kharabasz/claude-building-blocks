import type { Register } from 'claude-code'

// A stub: spend-bar moved to its own repository. Says so once per session until it is removed.
export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    $.ui.toast(
      'spend-bar moved to its own marketplace. Run: claude plugin install spend-bar --marketplace kharabasz/spend-bar, then uninstall spend-bar@claude-toolkit.',
    )

    return result
  })
}
