export interface Props {
    message: string
    open: boolean
    severity: 'error' | 'info' | 'success' | 'warning'
    onClose: () => void
}