import { Mail, Phone, Truck } from "lucide-react";

import Container from "./Container";

export default function TopBar() {
  return (
    <div className="hidden bg-primary py-1.5 text-xs font-medium text-text-white/90 lg:block">
      <Container>
        <div className="flex items-center justify-between">

          <p className="flex items-center gap-2">
            <Truck size={14} />
            Free shipping across India
          </p>

          <div className="flex gap-5">

            <span className="flex items-center gap-2">
              <Phone size={13} />
              +91 9876543210
            </span>

            <span className="flex items-center gap-2">
              <Mail size={13} />
              support@sleepbull.com
            </span>

          </div>

        </div>
      </Container>
    </div>
  );
}
