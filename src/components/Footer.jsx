import { Phone, Mail, MapPin } from 'lucide-react';
import { companyInfo } from '../data/initialData';

const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">{companyInfo.name}</h3>
          <p className="text-gray-400 mb-4">{companyInfo.slogan}</p>
          <p className="text-sm text-gray-400">
            Calidad y confianza en autopartes para tu vehículo
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-4">Contacto</h4>
          <div className="space-y-3 text-gray-400">
            <p className="flex items-center gap-2">
              <Phone size={16} /> {companyInfo.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> {companyInfo.email}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {companyInfo.address}
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-4">Horario</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>Lunes - Viernes: 8:00 AM - 6:00 PM</p>
            <p>Sábados: 9:00 AM - 2:00 PM</p>
            <p>Domingos: Cerrado</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
        <p>© 2025 {companyInfo.name}. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;