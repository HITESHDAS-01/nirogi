export default function EmergencyPage() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Emergency Card</h1>
        <p className="text-text-muted">
          Critical information accessible offline
        </p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-risk-red overflow-hidden">
        <div className="bg-risk-red text-white px-6 py-4 text-center">
          <h2 className="text-xl font-bold">🚨 EMERGENCY INFORMATION</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-sm text-text-muted uppercase tracking-wide">
              Blood Group
            </p>
            <p className="text-4xl font-bold text-risk-red mt-1">—</p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-text-muted uppercase tracking-wide mb-2">
              Allergies
            </p>
            <p className="text-text font-medium">No allergies recorded</p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-text-muted uppercase tracking-wide mb-2">
              Emergency Contact
            </p>
            <p className="text-text font-medium">Not set</p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-text-muted uppercase tracking-wide mb-2">
              Current Medicines
            </p>
            <p className="text-text font-medium">No medicines recorded</p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-text-muted uppercase tracking-wide mb-2">
              Chronic Conditions
            </p>
            <p className="text-text font-medium">No conditions recorded</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted text-center">
        Fill your profile and medical history to populate this card.
      </p>
    </div>
  );
}
