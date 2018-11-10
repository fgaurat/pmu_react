import React, { Component } from 'react';
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Loading from 'react-loading-bar'
import Highlight from './Highlight';
import 'react-loading-bar/dist/index.css'

class Synth extends Component {
    
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
                        ref:moment().format('DDMMYYYY'),
                        startDate: moment(),
                        loading: true,
                        synths:[]
                    };

    }

    loadSynth(date){
        this.setState({loading:true});
        const ref = moment(date).format('DDMMYYYY');
        let url = `http://ns349423.ip-94-23-40.eu:3000/pmu/synth/${ref}`;
        fetch(url)
            .then(resp=>resp.json())
            .then(
                    synths=>{
                        this.setState(
                            {
                                synths:synths,
                                loading:false,
                                ref:ref,
                                startDate:moment(date)
                            });
                    }
                );
    }
    
    componentDidMount() {
        this.loadSynth(new Date());

        setInterval(_=>{
            this.loadSynth(this.state.startDate)
        },5*60*1000);

    }
    
    handleChange = (date)=> {
        this.loadSynth(date);
    }

    today = () =>{
        const d = moment();
        this.loadSynth(d);
    }
    inc = () =>{
        const d = this.state.startDate;
        this.loadSynth(moment(d).add(1, 'days'));
    }
    dec = () =>{
        const d = this.state.startDate;
        this.loadSynth(moment(d).subtract(1, 'days'));
    }
    render() {
        const synthItems = this.state.synths.map((synth,index) =>
        <tr key={index}>
            <td>
                <a href={"https://www.pmu.fr/turf/"+synth.ref+"/R"+synth.reunion.numOfficiel+"/C"+synth.course.numOrdre} target="_new">détail</a>
            </td>
            <td>
            {synth.arr_score[0] === synth.arr_prono[0] && synth.arr_score[0] === synth.arr_simple_gagnant[0] && synth.arr_score[0] === synth.arr_simple_place[0]?<i className="fa fa-check"></i>:""}
            </td>
            <td>
                {synth.course.categorieParticularite==="COURSE_A_CONDITIONS"?<i className="fa fa-check"></i>:""}
            </td>
            <td>{synth.course.code}</td>
            <td>{synth.course.hippodrome.libelleCourt}</td>
            <td>{synth.course.specialite}</td>
            <td>{synth.course.categorieParticularite}</td>
            <td>
                <Moment format="HH:mm" date={synth.course.heureDepart} />
            </td>
            <td><Highlight refDay={synth.ref} code={synth.course.code} arrive={synth.arr_arrive} data={synth.arr_score.slice(0,3)}/></td>
            <td><Highlight refDay={synth.ref} code={synth.course.code} arrive={synth.arr_arrive} data={synth.arr_prono.slice(0,3)}/></td>
            <td><Highlight refDay={synth.ref} code={synth.course.code} arrive={synth.arr_arrive} data={synth.arr_simple_gagnant.slice(0,3)}/></td>
            <td><Highlight refDay={synth.ref} code={synth.course.code} arrive={synth.arr_arrive} data={synth.arr_simple_place.slice(0,3)}/></td>
            <td><Highlight refDay={synth.ref} code={synth.course.code} arrive={synth.arr_arrive} data={synth.arr_enforme.slice(0,3)}/></td>
            <td><Highlight refDay={synth.ref} code={synth.course.code} arrive={synth.arr_arrive} data={synth.arr_part_deferre.slice(0,3)}/></td>
            <td><Highlight refDay={synth.ref} code={synth.course.code} arrive={synth.arr_arrive} data={synth.arr_synth.slice(0,3)}/></td>
            <td>{synth.arr_arrive.slice(0,5).join(",")}</td>
        </tr>
        );

        return (
            <div className="Synth">
            
                <Loading show={this.state.loading} color="blue"/>
                
                <DatePicker selected={this.state.startDate} onChange={this.handleChange} dateFormat="DD/MM/YYYY" showSpinner={false}/>
                <button onClick={this.dec}>&lt;&lt;</button><button onClick={this.inc}>&gt;&gt;</button><button onClick={this.today}>Today</button>
                <table className="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>détail</th>
                            <th>score?</th>
                            <th>race?</th>
                            <th>code</th>
                            <th>hippodrome</th>
                            <th>specialite</th>
                            <th>categorieParticularite</th>
                            <th>heureDepart</th>
                            <th>score</th>
                            <th>prono</th>
                            <th>gagnant</th>
                            <th>place</th>
                            <th>forme</th>
                            <th>déféré</th>
                            <th>synth</th>
                            <th>arrivee</th>
                        </tr>  
                    </thead>
                    <tbody>
                        {synthItems}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Synth;
