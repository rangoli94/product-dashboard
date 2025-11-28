import './index.css'

export default function BadgeComponent({badgeValue, badgeColor}: {badgeValue: string, badgeColor: string }) {
    
  return (
     <span className={`badge-status ${badgeColor}`}>{badgeValue}</span>
  )
}
