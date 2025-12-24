
import React from 'react';
import { ServiceCategory, ServiceRequest } from './types';

export const CATEGORIES: ServiceCategory[] = [
  { id: '1', name: 'Elétrica', icon: '⚡', subcategories: ['Residencial', 'Industrial', 'Projetos', 'Manutenção'], baseLeadPrice: 15 },
  { id: '2', name: 'Hidráulica', icon: '💧', subcategories: ['Vazamentos', 'Instalação', 'Limpeza de Caixa d\'água'], baseLeadPrice: 10 },
  { id: '3', name: 'Pintura', icon: '🎨', subcategories: ['Interior', 'Exterior', 'Texturização'], baseLeadPrice: 8 },
  { id: '4', name: 'Construção', icon: '🏗️', subcategories: ['Alvenaria', 'Telhados', 'Reformas'], baseLeadPrice: 20 },
  { id: '5', name: 'Limpeza', icon: '🧹', subcategories: ['Pós-obra', 'Residencial', 'Estofados'], baseLeadPrice: 5 },
  { id: '6', name: 'Informática', icon: '💻', subcategories: ['Hardware', 'Software', 'Redes'], baseLeadPrice: 12 },
  { id: '7', name: 'Mecânica', icon: '🔧', subcategories: ['Automotiva', 'Motos', 'Ar condicionado'], baseLeadPrice: 15 },
  { id: '8', name: 'Jardinagem', icon: '🌱', subcategories: ['Paisagismo', 'Poda', 'Manutenção'], baseLeadPrice: 7 },
];

export const MOCK_REQUESTS: ServiceRequest[] = [
  {
    id: 'req_1',
    clientId: 'user_2',
    clientName: 'João Silva',
    category: 'Elétrica',
    subcategory: 'Residencial',
    description: 'Preciso trocar toda a fiação da minha sala e instalar 4 novos pontos de tomada.',
    location: 'São Paulo - SP (Vila Mariana)',
    urgency: 'high',
    budget: 800,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    unlockedBy: []
  },
  {
    id: 'req_2',
    clientId: 'user_3',
    clientName: 'Maria Oliveira',
    category: 'Hidráulica',
    subcategory: 'Vazamentos',
    description: 'Vazamento constante na pia da cozinha, parece ser o sifão.',
    location: 'Campinas - SP (Cambuí)',
    urgency: 'medium',
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    unlockedBy: ['pro_1']
  }
];
