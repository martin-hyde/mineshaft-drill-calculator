var Global_Drillbit = 0;
var Global_Acid = 0;
var Global_Oil = 0;
var Global_Depth = 100;
var Global_Selected_Interval = 0;
var Unit = "s";
const Drillbit_Names = ["Copper", "Iron", "Steel", "Tungsten"];
const Acid_Names = ["None", "Water", "Acetic", "Sulphuric", "Hydrochloric"];
const Oil_Names = ["None", "Machine"];
const Menu_Identifiers = ["Drillbit_Content", "Acid_Content", "Oil_Content"];
const Breaker_Identifiers = ["First_Latent_Breaker", "Second_Latent_Breaker", "Third_Latent_Breaker"];
const Output_Labels = ["First_Output_Label", "Second_Output_Label", "Third_Output_Label", "Fourth_Output_Label"];
const Items = [
    ["Rich Soil", "Soil", "Gravel", "Sand"],
    ["Rich Soil", "Soil", "Gravel", "Sand"],
    ["Raw Copper", "Raw Iron", "Gravel", "Coal"],
    ["Shallow Earth Fragment", "Raw Iron", "Gravel", "Coal"],
    ["Shallow Earth Fragment", "Raw Iron", "Gravel", "Raw Lead"],
    ["Shallow Earth Fragment", "Medium Earth Fragment", "Rock", "Raw Lead"],
    ["None", "Rock", "Medium Earth Fragment", "Raw Lead"],
    ["Medium Earth Fragment", "Raw Lead", "Shallow Earth Fragment", "Raw Iron"],
    ["None", "None", "Rock", "Medium Earth Fragment"],
    ["None", "None", "Rock", "Medium Earth Fragment"],
    ["Raw Lead", "Shallow Earth Fragment", "Raw Iron", "Gravel"],
    ["None", "Rock", "Raw Lead", "Shallow Earth Fragment"],
    ["Raw Iron", "Raw Lead", "Medium Earth Fragment", "Rock"],
    ["None", "Rock", "Raw Lead", "Raw Iron"],
    ["None", "Rock", "Raw Lead", "Medium Earth Fragment"],
    ["Coal", "Raw Lead", "Rock", "Medium Earth Fragment"],
    ["Raw Lead", "Rock", "Medium Earth Fragment", "Table Salt"],
    ["Coal", "Raw Lead", "Rock", "Medium Earth Fragment"],
    ["None", "None", "Coal", "Rock"],
    ["None", "Rock", "Bauxite Residue", "Raw Zinc"],
    ["Rock", "Bauxite Residue", "Raw Zinc", "Medium Earth Fragment"],
    ["Rock", "Bauxite Residue", "Raw Zinc", "Medium Earth Fragment"],
    ["Raw Lead", "Deep Earth Fragment", "Rock", "Raw Iron"],
    ["None", "Rock", "Bauxite Residue", "Medium Earth Fragment"],
    ["Bauxite Residue", "Raw Copper", "Raw Lead", "Rock"],
    ["None", "None", "Raw Lead", "Medium Earth Fragment"],
    ["None", "Rock", "Raw Lead", "Coal"],
    ["Rock", "Bauxite Residue", "Deep Earth Fragment", "Raw Copper"],
    ["None", "Rock", "Deep Earth Fragment", "Bauxite Residue"],
    ["None", "Bauxite Residue", "Deep Earth Fragment", "Rock"],
    ["Rock", "Deep Earth Fragment", "Bauxite Residue", "Raw Copper"],
    ["Bauxite Residue", "Rock", "Deep Earth Fragment", "Raw Lead"],
    ["Rock", "Deep Earth Fragment", "Bauxite Residue", "Raw Lead"],
    ["Rock", "Deep Earth Fragment", "Bauxite Residue", "Raw Copper"],
    ["None", "Rock", "Bauxite Residue", "Deep Earth Fragment"],
    ["None", "Deep Earth Fragment", "Bauxite Residue", "Medium Earth Fragment"],
    ["None", "Deep Earth Fragment", "Rock", "Bauxite Residue"]
];
const Yields = [
    [1.1, 3.3, 3.3, 3.3],
    [1.1, 3.3, 3.3, 3.3],
    [5.5, 5.5, 9.9, 6.6],
    [3.3, 11, 6.6, 22],
    [5.5, 8.8, 8.8, 1.1],
    [1.1, 2.2, 8.8, 5.5],
    [0, 10.3, 3.7, 10.2],
    [3.4, 5.7, 2.5, 10.5],
    [0, 0, 10.8, 4.9],
    [0, 0, 11.2, 9.3],
    [3.2, 2.8, 11.4, 2],
    [0, 6.6, 2.1, 1.7],
    [7.2, 3.4, 5.1, 5.7],
    [0, 8.5, 9.4, 9.1],
    [0, 6.8, 7.1, 7],
    [33.4, 3.8, 10.5, 7],
    [10.5, 6.5, 4, 64.4],
    [43.3, 5.3, 5.5, 6.9],
    [0, 0, 44.2, 16.3],
    [0, 8.6, 1.7, 8.4],
    [2.9, 1.3, 10.8, 8.5],
    [5.7, 1.3, 5.3, 12],
    [5.3, 1.5, 8.4, 23.8],
    [0, 9.4, 1.1, 10.5],
    [1, 20.2, 4.2, 5.9],
    [0, 0, 17.4, 11.9],
    [0, 5.7, 13.3, 59.4],
    [7.2, 1.1, 4.9, 55.8],
    [0, 8.5, 8.5, 2.5],
    [0, 2.1, 9.9, 9.7],
    [11.4, 6.5, 1.8, 88.8],
    [1.5, 12.8, 12, 4.7],
    [11.9, 9.4, 1.2, 6.1],
    [12.5, 9.6, 1.2, 47.2],
    [0, 10.8, 1.1, 5.4],
    [0, 9.3, 2.5, 7.3],
    [0, 12.8, 11.7, 2.3]
];

function Simplify_Time(Time) {
    Unit = "s";
    if (Time > 60) {
        Time = Time / 60;
        Unit = "m";
        if (Time > 60) {
            Time = Time / 60;
            Unit = "h";
            if (Time > 24) {
                Time = Time / 24;
                Unit = "d";
                if (Time > 7) {
                    Time = Time / 7;
                    Unit = "wk";
                }
            }
        }
    }
    return Time;
}

function Truncate(Number, Decimals) {
    return String(Math.round((10 ** Decimals) * Number) / (10 ** Decimals));
}

function Toggle_Dropdown(Identifier) {
    document.getElementById(Menu_Identifiers[Identifier]).classList.toggle("show");
    Toggle_Breaker(Identifier);
    for (var Counter = 0; Counter < Menu_Identifiers.length; Counter++) {
        if (Counter != Identifier && document.getElementById(Menu_Identifiers[Counter]).classList.contains("show")) {
            document.getElementById(Menu_Identifiers[Counter]).classList.remove("show");
            Toggle_Breaker(Counter);
        }
    }
}

function Toggle_Breaker(Identifier) {
    if (document.getElementById(Menu_Identifiers[Identifier]).classList.contains("show")) {
        document.getElementById(Breaker_Identifiers[Identifier]).style.display = 'block';
    } else {
        document.getElementById(Breaker_Identifiers[Identifier]).style.display = 'none';
    }
}

function Swap_Drillbit(Drillbit) {
    Global_Drillbit = Drillbit;
    document.getElementById("Drillbit_Button").innerHTML = "Drillhead — " + Drillbit_Names[Drillbit];
    Toggle_Dropdown(0);
    Recalculate_Yields();
}

function Swap_Acid(Acid) {
    Global_Acid = Acid;
    document.getElementById("Acid_Button").innerHTML = "Acid — " + Acid_Names[Acid];
    Toggle_Dropdown(1);
    Recalculate_Yields();
}

function Swap_Oil(Oil) {
    Global_Oil = Oil;
    document.getElementById("Oil_Button").innerHTML = "Oil — " + Oil_Names[Oil];
    Toggle_Dropdown(2);
    Recalculate_Yields();
}

function Recalculate_Yields() {
    var Drillbit_Multiplier = 0;
    switch (Global_Drillbit) {
        case 0:
            Drillbit_Multiplier = Global_Depth / 150;
            break;
        case 1:
            Drillbit_Multiplier = (Global_Depth ** 0.25) * 0.04;
            break;
        case 2:
            Drillbit_Multiplier = (Global_Depth ** 0.25) * 0.02;
            break;
        case 3:
            Drillbit_Multiplier = (Global_Depth ** 0.25) * 0.005;
            break;
        default:
            break;
    }
    var Acid_Multiplier = 0;
    switch (Global_Acid) {
        case 0:
            Acid_Multiplier = (Global_Depth ** 2) / 900000;
            break;
        case 1:
            Acid_Multiplier = (Global_Depth ** 2) / 1875000;
            break;
        case 2:
            Acid_Multiplier = (Global_Depth ** 0.8) / 450;
            break;
        case 3:
            Acid_Multiplier = (Global_Depth ** 0.25) * 0.09;
            break;
        case 4:
            if (Global_Depth < 6000) {
                Acid_Multiplier = ((Global_Depth ** (1.5 - (0.00005 * Global_Depth))) * 0.000013) + (((10 ** -13.3) * 4.3875) * (Global_Depth ** 3));
            } else {
                Acid_Multiplier = (Global_Depth ** 0.25) * 0.09;
            }
            break;
        default:
            break;
    }
    var Deterioration_Rate = 0.5 * Drillbit_Multiplier * Acid_Multiplier * ((10 + Global_Oil) / 10);
    document.getElementById("Deterioration_Label").innerText = "Deterioration Rate: " + Truncate(Deterioration_Rate, 5) + "%/s";
    var Lifetime = Math.ceil(100 / Deterioration_Rate);
    var Cycle = (2 * (Global_Depth / (50 * (Global_Oil + 1)))) + 12;
    var Period = Cycle + Lifetime;
    var Efficiency = Lifetime / Period;
    var Drillbit_Consumption = 1 / Period;
    var Second_Drillbit_Consumption = 1 / Lifetime;
    for (var Counter = 0; Counter < 4; Counter++) {
        var Amount = 0;
        if (Yields[Global_Selected_Interval][Counter] != 0) {
            Amount = (Yields[Global_Selected_Interval][Counter]) * (1 + (Global_Oil / 10));
        }
        document.getElementById(Output_Labels[Counter]).innerText = Items[Global_Selected_Interval][Counter] + ": " + Truncate(Amount * Efficiency, 2) + "u/s (average), " + Truncate(Amount, 2) + "u/s (active)";
    }
    document.getElementById("Lifetime_Label").innerText = "Lifetime: " + Truncate(Simplify_Time(Lifetime), 2) + Unit;
    document.getElementById("Cycle_Label").innerText = "Cycle Time: " + Truncate(Simplify_Time(Period), 2) + Unit;
    document.getElementById("Cycling_Label").innerText = "Replacement Time: " + Truncate(Simplify_Time(Cycle), 2) + Unit;
    document.getElementById("Efficiency_Label").innerText = "Efficiency: " + Truncate(Efficiency * 100, 2) + "%";
    var Drillbit_Text = "Copper";
    var Drillbit_Material = 700;
    switch (Global_Drillbit) {
        case 1:
            Drillbit_Material = 2100;
            Drillbit_Text = "Iron";
            break;
        case 2:
            Drillbit_Material = 3500;
            Drillbit_Text = "Steel";
            break;
        case 3:
            Drillbit_Material = 1275;
            Drillbit_Text = "Tungsten";
            break;
        default:
            break;
    }
    var Second_Drillbit_Material = Drillbit_Material * Second_Drillbit_Consumption;
    Drillbit_Material = Drillbit_Material * Drillbit_Consumption;
    document.getElementById("Drillbit_Label").innerText = Drillbit_Text + " Drillhead: " + Truncate(Drillbit_Consumption, 5) + "u/s (average), " + Truncate(Second_Drillbit_Consumption, 5) + "u/s (active)";
    document.getElementById("Materials_Label").innerText = Drillbit_Text + " Ingot: " + Truncate(Drillbit_Material, 5) + "u/s (average), " + Truncate(Second_Drillbit_Material, 5) + "u/s (active)";
    var Acid_Text = "No Acid";
    var Acid_Amount = 0;
    switch (Global_Acid) {
        case 1:
            Acid_Amount = 10;
            Acid_Text = "Water";
            break;
        case 2:
            Acid_Amount = 3;
            Acid_Text = "Acetic Acid";
            break;
        case 3:
            Acid_Amount = 1;
            Acid_Text = "Sulphuric Acid";
            break;
        case 4:
            Acid_Amount = 1.5;
            Acid_Text = "Hydrochloric Acid";
            break;
        default:
            break;
    }
    document.getElementById("Acid_Label").innerText = Acid_Text + ": " + Truncate(Acid_Amount * Efficiency, 2) + "L/s (average), " + Acid_Amount + "L/s (active)";
    document.getElementById("Oil_Label").innerText = "Machine Oil: " + Truncate((Global_Oil * 2) * ((Period - 12) / Period), 2) + "L/s (average), " + String(Global_Oil * 2) + "L/s (active)";
    document.getElementById("Power_Label").innerText = "Power: " + Truncate((3.1 * Lifetime + 0.1 * (Period - Lifetime)) / Period, 2) + "MMF/s (average), 3.1MMF/s (active)";
}
