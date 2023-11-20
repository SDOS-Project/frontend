export const engineeringFields = Object.freeze({
  'Civil Engineering': [
    'Structural Engineering',
    'Geotechnical Engineering',
    'Transportation Engineering',
    'Environmental Engineering',
  ],
  'Mechanical Engineering': [
    'Thermal Engineering',
    'Manufacturing Engineering',
    'Robotics and Automation',
    'Materials Engineering',
  ],
  'Electrical Engineering': [
    'Power Systems',
    'Electronics and Communication Engineering',
    'Control Systems',
    'Power Electronics',
  ],
  'Computer Science and Engineering': [
    'Artificial Intelligence (AI)',
    'Data Science and Big Data',
    'Software Engineering',
    'Computer Networks',
  ],
  'Aerospace Engineering': [
    'Aerodynamics',
    'Aircraft and Spacecraft Design',
    'Propulsion Systems',
    'Avionics and Control Systems',
  ],
  'Chemical Engineering': [
    'Chemical Process Engineering',
    'Petrochemical Engineering',
    'Biochemical Engineering',
    'Environmental and Safety Engineering',
  ],
  'Biomedical Engineering': [
    'Medical Imaging and Biomechanics',
    'Biomaterials and Tissue Engineering',
    'Medical Devices and Instrumentation',
    'Healthcare Systems Engineering',
  ],
  'Civil and Environmental Engineering': [
    'Water Resources Engineering',
    'Geoenvironmental Engineering',
    'Sustainable Infrastructure',
    'Disaster Mitigation and Management',
  ],
  'Materials Science and Engineering': [
    'Semiconductor Physics',
    'Nanotechnology',
    'Energy Systems',
    'Computational Mechanics',
  ],
  'Automobile Engineering': [
    'Vehicle Dynamics and Design',
    'Tyre Mechanics and Design',
    'Automotive System and Control',
    'Intelligent Transportation System',
  ],
  Mechatronics: [
    'Underwater Robotics',
    'Medical Robotics',
    'Aerial Robotics',
    'Optomechatronics',
  ],
  'Textile Engineering': [
    'Fibre Science & Technology',
    'Structural Mechanics of Fibrous Assemblies',
    'Smart Textiles',
    'Simulation & Modeling',
  ],
  'Ocean Engineering': [
    'Naval Engineering',
    'Coastal Engineering',
    'Offshore Engineering',
    'Petroleum Engineering',
  ],
});

export const disciplineEnumMapping = Object.freeze({
  'Civil Engineering': 'CivilEngineering',
  'Mechanical Engineering': 'MechanicalEngineering',
  'Electrical Engineering': 'ElectricalEngineering',
  'Computer Science and Engineering': 'ComputerScienceAndEngineering',
  'Aerospace Engineering': 'AerospaceEngineering',
  'Chemical Engineering': 'ChemicalEngineering',
  'Biomedical Engineering': 'BiomedicalEngineering',
  'Civil and Environmental Engineering': 'CivilAndEnvironmentalEngineering',
  'Materials Science and Engineering': 'MaterialsScienceAndEngineering',
  'Automobile Engineering': 'AutomobileEngineering',
  Mechatronics: 'Mechatronics',
  'Textile Engineering': 'TextileEngineering',
  'Ocean Engineering': 'OceanEngineering',
});

export const disciplineDisplayMapping = Object.fromEntries(
  Object.entries(disciplineEnumMapping).map(([key, value]) => [value, key])
);
