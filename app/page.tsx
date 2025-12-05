"use client";
import { useState, useEffect } from 'react';

export default function MetaFinanceira() {
  const [ganhoDesejado, setGanhoDesejado] = useState(50000);
  const [percLucro, setPercLucro] = useState(35);
  const [percGanhos, setPercGanhos] = useState(25);
  const [percRendimento, setPercRendimento] = useState(12);
  const [showConfig, setShowConfig] = useState(false);

  const lucroMensal = ganhoDesejado / (percGanhos / 100);
  const faturamentoMensal = lucroMensal / (percLucro / 100);
  const economiaMensal = lucroMensal * ((100 - percGanhos) / 100);
  const economiaAnual = economiaMensal * 12;
  const investimentoNecessario = ganhoDesejado / (percRendimento / 100 / 12);
  const anosIndependencia = investimentoNecessario / economiaAnual;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatYears = (years: number) => {
    const y = Math.floor(years);
    const m = Math.round((years - y) * 12);
    if (y === 0) return `${m} meses`;
    if (m === 0) return `${y} ${y === 1 ? 'ano' : 'anos'}`;
    return `${y} ${y === 1 ? 'ano' : 'anos'} e ${m} ${m === 1 ? 'mês' : 'meses'}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4c000d 0%, #6b0f0f 50%, #4c000d 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#fff',
      padding: '40px 20px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .card { background: rgba(255,255,255,0.05); border: 1px solid rgba(238,206,102,0.2); border-radius: 20px; backdrop-filter: blur(20px); }
        .glow { box-shadow: 0 0 60px rgba(238,206,102,0.1), 0 0 100px rgba(238,206,102,0.05); }
        .number { font-family: 'Cormorant Garamond', serif; font-weight: 700; letter-spacing: -0.02em; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,225,166,0.6); font-weight: 600; }
        .gold { color: #eece66; }
        .gold-bg { background: linear-gradient(135deg, #eece66 0%, #ffe1a6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        input[type="range"] { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 2px; background: rgba(255,225,166,0.2); outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: linear-gradient(135deg, #eece66 0%, #ffe1a6 100%); cursor: pointer; box-shadow: 0 0 15px rgba(238,206,102,0.4); }
        .config-btn { background: rgba(238,206,102,0.1); border: 1px solid rgba(238,206,102,0.3); color: #ffe1a6; padding: 12px 24px; border-radius: 10px; cursor: pointer; font-size: 13px; transition: all 0.2s; font-weight: 500; }
        .config-btn:hover { background: rgba(238,206,102,0.2); }
        .step { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .step-number { width: 28px; height: 28px; background: linear-gradient(135deg, #eece66, #ffe1a6); color: #4c000d; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; }
        .step-text { color: rgba(255,225,166,0.8); font-size: 14px; }
        .arrow { color: #eece66; font-size: 20px; text-align: center; margin: 8px 0; }
      `}</style>

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ marginBottom: 16 }}>
            <svg width="60" height="60" viewBox="0 0 100 100" style={{ opacity: 0.9 }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#eece66" strokeWidth="2"/>
              <circle cx="50" cy="35" r="15" fill="#ffe1a6"/>
              <path d="M25 75 Q50 55 75 75" stroke="#eece66" strokeWidth="3" fill="none"/>
              <path d="M20 50 L35 45 M80 50 L65 45" stroke="#eece66" strokeWidth="2"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 600, marginBottom: 8, lineHeight: 1.1 }}>
            Calculadora de<br/><span className="gold-bg">Independência Financeira</span>
          </h1>
          <p style={{ color: 'rgba(255,225,166,0.6)', fontSize: 15 }}>Descubra exatamente o que você precisa para viver do seu negócio</p>
        </div>

        {/* Input Principal */}
        <div className="card glow" style={{ padding: '32px 36px', marginBottom: 20 }}>
          <div className="label" style={{ marginBottom: 12 }}>Quanto você quer colocar no bolso todo mês?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 28, fontWeight: 500, color: 'rgba(255,225,166,0.4)' }}>R$</span>
            <input
              type="text"
              value={ganhoDesejado.toLocaleString('pt-BR')}
              onChange={(e) => {
                const value = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                setGanhoDesejado(Math.min(value, 10000000));
              }}
              style={{ background: 'transparent', border: 'none', fontSize: 'clamp(36px, 9vw, 64px)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: '#ffe1a6', width: '100%', outline: 'none' }}
            />
          </div>
          <input type="range" min="5000" max="500000" step="5000" value={ganhoDesejado} onChange={(e) => setGanhoDesejado(parseInt(e.target.value))} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'rgba(255,225,166,0.3)' }}>
            <span>R$ 5.000</span><span>R$ 500.000</span>
          </div>
        </div>

        {/* Fluxo Didático */}
        <div className="card" style={{ padding: '28px 32px', marginBottom: 20 }}>
          <div className="label" style={{ marginBottom: 20, textAlign: 'center' }}>Como funciona o cálculo</div>
          
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-text">Você quer retirar <strong className="gold">{formatCurrency(ganhoDesejado)}</strong>/mês ({percGanhos}% do lucro)</div>
          </div>
          <div className="arrow">↓</div>
          
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-text">Seu lucro precisa ser <strong className="gold">{formatCurrency(lucroMensal)}</strong>/mês</div>
          </div>
          <div className="arrow">↓</div>
          
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">Com {percLucro}% de margem, você fatura <strong className="gold">{formatCurrency(faturamentoMensal)}</strong>/mês</div>
          </div>
          <div className="arrow">↓</div>
          
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-text">Sobram <strong className="gold">{formatCurrency(economiaMensal)}</strong>/mês para caixa e investimentos</div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
          <div className="card" style={{ padding: 24, textAlign: 'center' }}>
            <div className="label" style={{ marginBottom: 6 }}>Faturamento/Mês</div>
            <div className="number gold" style={{ fontSize: 26 }}>{formatCurrency(faturamentoMensal)}</div>
          </div>
          <div className="card" style={{ padding: 24, textAlign: 'center' }}>
            <div className="label" style={{ marginBottom: 6 }}>Faturamento/Ano</div>
            <div className="number gold" style={{ fontSize: 26 }}>{formatCurrency(faturamentoMensal * 12)}</div>
          </div>
          <div className="card" style={{ padding: 24, textAlign: 'center' }}>
            <div className="label" style={{ marginBottom: 6 }}>Economia/Ano</div>
            <div className="number gold" style={{ fontSize: 26 }}>{formatCurrency(economiaAnual)}</div>
          </div>
        </div>

        {/* Independência Financeira */}
        <div className="card glow" style={{ padding: 36, textAlign: 'center', marginBottom: 20, background: 'linear-gradient(135deg, rgba(238,206,102,0.08) 0%, rgba(255,225,166,0.08) 100%)', border: '1px solid rgba(238,206,102,0.25)' }}>
          <div className="label" style={{ marginBottom: 16 }}>Para viver de renda com {formatCurrency(ganhoDesejado)}/mês você precisa de</div>
          <div className="number" style={{ fontSize: 'clamp(36px, 9vw, 56px)', color: '#ffe1a6', marginBottom: 6 }}>{formatCurrency(investimentoNecessario)}</div>
          <div style={{ fontSize: 14, color: 'rgba(255,225,166,0.5)', marginBottom: 28 }}>investidos rendendo {percRendimento}% ao ano</div>
          
          <div style={{ display: 'inline-block', background: 'rgba(238,206,102,0.15)', padding: '20px 40px', borderRadius: 14, border: '1px solid rgba(238,206,102,0.2)' }}>
            <div className="label" style={{ marginBottom: 6 }}>Tempo até a liberdade financeira</div>
            <div className="number gold-bg" style={{ fontSize: 36 }}>{formatYears(anosIndependencia)}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,225,166,0.5)', marginTop: 6 }}>guardando {formatCurrency(economiaAnual)} por ano</div>
          </div>
        </div>

        {/* Config Toggle */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <button className="config-btn" onClick={() => setShowConfig(!showConfig)}>
            {showConfig ? '✕ Fechar' : '⚙ Personalizar percentuais'}
          </button>
        </div>

        {showConfig && (
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'grid', gap: 20 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                  <div>
                    <span className="label">Margem de Lucro</span>
                    <div style={{ fontSize: 12, color: 'rgba(255,225,166,0.4)', marginTop: 2 }}>% do faturamento que vira lucro</div>
                  </div>
                  <span className="number gold" style={{ fontSize: 20 }}>{percLucro}%</span>
                </div>
                <input type="range" min="10" max="80" value={percLucro} onChange={(e) => setPercLucro(parseInt(e.target.value))} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                  <div>
                    <span className="label">Sua Retirada</span>
                    <div style={{ fontSize: 12, color: 'rgba(255,225,166,0.4)', marginTop: 2 }}>% do lucro que você coloca no bolso</div>
                  </div>
                  <span className="number gold" style={{ fontSize: 20 }}>{percGanhos}%</span>
                </div>
                <input type="range" min="10" max="90" value={percGanhos} onChange={(e) => setPercGanhos(parseInt(e.target.value))} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                  <div>
                    <span className="label">Rendimento dos Investimentos</span>
                    <div style={{ fontSize: 12, color: 'rgba(255,225,166,0.4)', marginTop: 2 }}>% ao ano que seu dinheiro rende</div>
                  </div>
                  <span className="number gold" style={{ fontSize: 20 }}>{percRendimento}%</span>
                </div>
                <input type="range" min="4" max="20" value={percRendimento} onChange={(e) => setPercRendimento(parseInt(e.target.value))} />
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 36, fontSize: 12, color: 'rgba(255,225,166,0.25)', fontWeight: 500, letterSpacing: '0.15em' }}>RECONECTA</div>
      </div>
    </div>
  );
}
