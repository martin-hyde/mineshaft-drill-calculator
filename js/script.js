var Global_Drillbit = 0; //drillbit index
var Global_Acid = 0; //acid index
var Global_Oil = 0; //oil index
var Global_Selected_Interval = 0; //depth index
var Unit = "s"; //unit for time
var Sig_figs = 3; //number of siginificant figures in displayed values
const Drillbit_Names = ["Copper", "Iron", "Steel", "Tungsten"];
const Acid_Names = ["None", "Water", "Acetic", "Sulfuric", "Hydrochloric"];
const Oil_Names = ["None", "Machine Oil"]
const Depths = [100, 300, 900, 1200, 1500, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800, 7000, 7200, 7400, 7600, 7800, 8000];
const Menu_Identifiers = ["Drillbit_Content", "Acid_Content", "Oil_Content", "Depth_Content"];
const Output_Labels = ["First_Output_Label", "Second_Output_Label", "Third_Output_Label", "Fourth_Output_Label"];
const //item names
    Soil = "🌱 Soil",
    RichSoil = "<div style='display: inline; filter: sepia(33%) invert(0.3) saturate(7.1) hue-rotate(334deg) brightness(0.51);'>🪨</div> Rich Soil",
    Sand = "<div style='display: inline; filter: sepia(1) saturate(2.1) brightness(1.25);'>🪨</div> Sand",
    Gravel = "🪨 Gravel",
    Rock = "Rock",
    Coal = "Coal",
    RawCopper = "Raw Copper",
    RawIron = "Raw Iron",
    RawLead = "Raw Lead",
    RawZinc = "Raw Zinc",
    BauxiteResidue = "Bauxite Residue",
    TableSalt = "Table Salt",
    ShallowEF = "Shallow Earth Fragment",
    MediumEF = "Medium Earth Fragment",
    DeepEF = "Deep Earth Fragment",
    None = "None";
const Items = [ //items for each depth
    [Sand, Gravel, Soil, RichSoil],
    [Sand, Gravel, Soil, RichSoil],
    [Coal, Gravel, RawIron, RawCopper],
    [Coal, Gravel, RawIron, ShallowEF],
    [RawLead, Gravel, RawIron, ShallowEF],
    [RawLead, Rock, MediumEF, ShallowEF],
    [RawLead, MediumEF, Rock, None],
    [RawIron, ShallowEF, RawLead, MediumEF],
    [MediumEF, Rock, None, None],
    [MediumEF, Rock, None, None],
    [Gravel, RawIron, ShallowEF, RawLead],
    [ShallowEF, RawLead, Rock, None],
    [Rock, MediumEF, RawLead, RawIron],
    [RawIron, RawLead, Rock, None],
    [MediumEF, RawLead, Rock, None],
    [MediumEF, Rock, RawLead, Coal],
    [TableSalt, MediumEF, Rock, RawLead],
    [MediumEF, Rock, RawLead, Coal],
    [Rock, Coal, None, None],
    [RawZinc, BauxiteResidue, Rock, None],
    [MediumEF, RawZinc, BauxiteResidue, Rock],
    [MediumEF, RawZinc, BauxiteResidue, Rock],
    [RawIron, Rock, DeepEF, RawLead],
    [MediumEF, BauxiteResidue, Rock, None],
    [Rock, RawLead, RawCopper, BauxiteResidue],
    [MediumEF, RawLead, None, None],
    [Coal, RawLead, Rock, None],
    [RawCopper, DeepEF, BauxiteResidue, Rock],
    [BauxiteResidue, DeepEF, Rock, None],
    [Rock, DeepEF, BauxiteResidue, None],
    [RawCopper, BauxiteResidue, DeepEF, Rock],
    [RawLead, DeepEF, Rock, BauxiteResidue],
    [RawLead, BauxiteResidue, DeepEF, Rock],
    [RawCopper, BauxiteResidue, DeepEF, Rock],
    [DeepEF, BauxiteResidue, Rock, None],
    [MediumEF, BauxiteResidue, DeepEF, None],
    [BauxiteResidue, Rock, DeepEF, None]
];
const Yields = [ //item yields for each depth
    [3, 3, 3, 1],
    [3, 3, 3, 1],
    [6, 9, 5, 5],
    [20, 6, 10, 3],
    [1, 8, 8, 5],
    [5, 8, 2, 1],
    [9.3, 3.4, 9.4, 0],
    [9.6, 2.3, 5.1, 3.1],
    [4.5, 9.8, 0, 0],
    [8.4, 10.2, 0, 0],
    [1.8, 10.4, 2.5, 2.9],
    [1.5, 1.9, 6, 0],
    [5.1, 4.6, 3.1, 6.5],
    [8.3, 8.6, 7.8, 0],
    [6.3, 6.4, 6.2, 0],
    [6.4, 9.6, 3.5, 30.4],
    [58.5, 3.7, 5.9, 9.6],
    [6.3, 5, 4.8, 39.3],
    [14.8, 40.2, 0, 0],
    [7.6, 1.6, 7.8, 0],
    [7.8, 9.8, 1.2, 2.6],
    [10.9, 4.8, 1.2, 5.2],
    [21.6, 7.6, 1.4, 4.8],
    [9.5, 1, 8.5, 0],
    [5.4, 3.8, 18.3, 0.9],
    [10.9, 15.8, 0, 0],
    [54, 12.1, 5.2, 0],
    [50.7, 4.4, 1, 6.6],
    [2.3, 7.7, 7.7, 0],
    [8.8, 9, 1.9, 0],
    [80.8, 1.6, 5.9, 10.4],
    [4.3, 10.9, 11.7, 1.3],
    [5.5, 1.1, 8.6, 10.8],
    [43, 1.1, 8.7, 11.4],
    [4.9, 1, 9.8, 0],
    [6.7, 2.2, 8.4, 0],
    [2.1, 10.7, 11.7, 0]
];

function Simplify_Time(Time) { 
    var Unit = "s";
    if (Time > 60) {
        Time /= 60;
        Unit = "m";
        if (Time > 60) {
            Time /= 60;
            Unit = "h";
            if (Time > 24) {
                Time /= 24;
                Unit = "d";
            }
        }
    }
    return Truncate(Time) + Unit;
}

//rounds values to the given number of significant figures
function Truncate(Number) {
    if (Number == 0) return 0;
    var scale = 10**(Sig_figs-1-Math.floor(Math.log10(Math.abs(Number))));
    return String(Math.round(Number * scale) / scale);
}

function Toggle_Dropdown(Identifier) { //identifier -1 closes all menus
    if (Identifier != -1) document.getElementById(Menu_Identifiers[Identifier]).classList.toggle("show");
    for (var Counter = 0; Counter < Menu_Identifiers.length; Counter++) {
        if (Counter != Identifier && document.getElementById(Menu_Identifiers[Counter]).classList.contains("show")) {
            document.getElementById(Menu_Identifiers[Counter]).classList.remove("show");
        }
    }
}

function Swap_Drillbit(Drillbit) {
    Global_Drillbit = Drillbit;
    document.getElementById("Drillbit_Button").classList = "Dropdown_Button " + Drillbit_Names[Drillbit].toLowerCase();
    document.getElementById("Drillbit_Button").innerHTML = "Drillhead — " + Drillbit_Names[Drillbit];
    Toggle_Dropdown(0);
    Recalculate_Yields();
}

function Swap_Acid(Acid) {
    Global_Acid = Acid;
    document.getElementById("Acid_Button").classList = "Dropdown_Button " + Acid_Names[Acid].toLowerCase();
    document.getElementById("Acid_Button").innerHTML = "Acid — " + Acid_Names[Acid];
    Toggle_Dropdown(1);
    Recalculate_Yields();
}

function Swap_Oil(Oil) {
    Global_Oil = Oil;
    document.getElementById("Oil_Button").classList = "Dropdown_Button " + Oil_Names[Oil].toLowerCase().replace(" ", "");
    document.getElementById("Oil_Button").innerHTML = "Oil — " + Oil_Names[Oil];
    Toggle_Dropdown(2);
    Recalculate_Yields();
}

function Swap_Depth(Interval) {
    Global_Selected_Interval = Interval;
    document.getElementById("Depth_Button").classList = "Dropdown_Button " + "depth"+Depths[Interval]; //depth100, depth300, ..., depth8000
    document.getElementById("Depth_Button").innerHTML = "Depth — " + Depths[Interval] + "m";
    Toggle_Dropdown(3);
    Recalculate_Yields();
}

function Recalculate_Yields() {
    //drillhead info
    var Functional_Depth = Depths[Math.max(Global_Selected_Interval, 1)];

    var Drillbit_Multiplier;
    switch (Global_Drillbit) {
        case 0:
            Drillbit_Multiplier = Functional_Depth / 150;
            break;
        case 1:
            Drillbit_Multiplier = Functional_Depth ** 0.25 * 0.04;
            break;
        case 2:
            Drillbit_Multiplier = Functional_Depth ** 0.25 * 0.02;
            break;
        case 3:
            Drillbit_Multiplier = Functional_Depth ** 0.25 * 0.005;
            break;
    }

    var Acid_Multiplier;
    switch (Global_Acid) {
        case 0:
            Acid_Multiplier = Functional_Depth ** 2 / 900000;
            break;
        case 1:
            Acid_Multiplier = Functional_Depth ** 2 / 1875000;
            break;
        case 2:
            Acid_Multiplier = Functional_Depth ** 0.8 / 450;
            break;
        case 3:
            Acid_Multiplier = Functional_Depth ** 0.25 * 0.09;
            break;
        case 4:
            Acid_Multiplier = Functional_Depth < 6000 ?
                Functional_Depth ** (1.5 - Functional_Depth * 0.00005) * 0.000013 + Functional_Depth ** 3 * 10 ** -13.3 * 4.3875 :
                Acid_Multiplier = Functional_Depth ** 0.25 * 0.09;
            break;
    }

    var Deterioration_Rate = 0.5 * Drillbit_Multiplier * Acid_Multiplier * (1 + Global_Oil / 10);
    var Lifetime = Math.ceil(100 / Deterioration_Rate);
    var ReplacementTime = 2 * Depths[Global_Selected_Interval] / (50 * (Global_Oil + 1)) + 12;
    var CycleTime = ReplacementTime + Lifetime;
    var Efficiency = Lifetime / CycleTime;

    document.getElementById("Deterioration_Label").innerHTML = "⛓️‍💥 Deterioration Rate: " + Truncate(Deterioration_Rate) + "%/s";
    document.getElementById("Lifetime_Label").innerHTML = "🕗 Lifetime: " + Simplify_Time(Lifetime);
    document.getElementById("Replacement_Label").innerHTML = "🔄 Replacement Time: " + Simplify_Time(ReplacementTime);
    document.getElementById("Cycle_Label").innerHTML = "⏳ Cycle Time: " + Simplify_Time(CycleTime);
    document.getElementById("Efficiency_Label").innerHTML = `🔧 Efficiency: <b style='color: rgb(${(1 - Efficiency) * 255}, ${Efficiency * 255}, 0);'>` + Truncate(Efficiency * 100) + "%</b>";
    
    //consumption info
    var Drillbit_Consumption = 1 / CycleTime;
    var Active_Drillbit_Consumption = 1 / Lifetime;

    var Drillbit_Text = Drillbit_Names[Global_Drillbit];
    var Drillbit_Material;
    switch (Global_Drillbit) {
        case 0:
            Drillbit_Material = 700;
            break;
        case 1:
            Drillbit_Material = 2100;
            break;
        case 2:
            Drillbit_Material = 3500;
            break;
        case 3:
            Drillbit_Material = 1275;
            break;
    }
    var Active_Drillbit_Material = Drillbit_Material * Active_Drillbit_Consumption;
    Drillbit_Material = Drillbit_Material * Drillbit_Consumption;
    document.getElementById("Drillbit_Label").innerHTML = `<div class='${Drillbit_Text.toLowerCase()} squareDisplay drill'></div>` + Drillbit_Text + " Drillhead: " + Truncate(Drillbit_Consumption) + "u/s (average), " + Truncate(Active_Drillbit_Consumption) + "u/s (active)";
    document.getElementById("Materials_Label").innerHTML = `<div class='${Drillbit_Text.toLowerCase()} squareDisplay ingot'></div>` + Drillbit_Text + ` ${Drillbit_Text == Drillbit_Names[3] ? "Carbide Plate" : "ingot"}: ` + Truncate(Drillbit_Material) + "u/s (average), " + Truncate(Active_Drillbit_Material) + "u/s (active)";
    
    var Acid_Text;
    var Acid_Amount;
    switch (Global_Acid) {
        case 0:
            Acid_Text = "<div style='display: inline; margin-left: 2px;'></div>🗙<div style='display: inline; margin-right: 2px;'></div> No Acid";
            Acid_Amount = 0;
            break;
        case 1:
            Acid_Text = "💧 Water";
            Acid_Amount = 10;
            break;
        case 2:
            Acid_Text = "<div style='display: inline; filter: grayscale(1) brightness(2.5);'>🩸</div> Acetic Acid";
            Acid_Amount = 3;
            break;
        case 3:
            Acid_Text = "<div style='display: inline; filter: hue-rotate(236deg) brightness(3.5);'>🩸</div> Sulfuric Acid";
            Acid_Amount = 1;
            break;
        case 4:
            Acid_Text = "<div style='display: inline; filter: hue-rotate(71deg) saturate(0.4) brightness(2.5);'>🩸</div> Hydrochloric Acid";
            Acid_Amount = 1.5;
            break;
    }
    document.getElementById("Acid_Label").innerHTML = Acid_Text + ": " + Truncate(Acid_Amount * Efficiency) + "L/s (average), " + Acid_Amount + "L/s (active)";
    
    var oilText;
    switch(Global_Oil) {
        case 0:
            oilText = "<div style='display: inline; margin-left: 2px;'></div>🗙<div style='display: inline; margin-right: 2px;'></div> No Oil: ";
            break;
        case 1:
            oilText = "<div style='display: inline; filter: hue-rotate(65deg) brightness(3.5);'>🩸</div> Machine Oil: ";
            break;
    } 
    document.getElementById("Oil_Label").innerHTML = oilText + Truncate(Global_Oil * 2 * (CycleTime - 12) / CycleTime) + "L/s (average), " + Global_Oil * 2 + "L/s (active)";
    document.getElementById("Power_Label").innerHTML = "⚡ Power: " + Truncate((3.1 * Lifetime + 0.1 * ReplacementTime) / CycleTime) + "MMF/s (average), 3.1MMF/s (active)";
    
    //output info
    for (var Counter = 0; Counter < 4; Counter++) {
        var Amount = Yields[Global_Selected_Interval][Counter] * (1 + (Global_Oil / 10));
        document.getElementById(Output_Labels[Counter]).innerHTML = Items[Global_Selected_Interval][Counter] == None ? "" : Items[Global_Selected_Interval][Counter] + ": " + Truncate(Amount * Efficiency) + "u/s (average), " + Truncate(Amount) + "u/s (active)";
    }
}