import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./BatchManage.css";
import axios from "axios";
import Backend from "../../apis/Backend";
import { BatchContext } from "../../context/BatchProvider";
import { getCurrentUser } from "../auth/Auth";
import AppSidebar from "../shared/AppSidebar";
import {
  BriefcaseBusiness,
  Boxes,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Eye,
  GraduationCap,
  MoreVertical,
  Plus,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";
import StatsCard from "../shared/StatsCard";

function BatchManage() {
  const user = getCurrentUser();
  const { batchState, setBatchState } = useContext(BatchContext);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openDetails, setOpenDetails] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const getBatchStatus = (batch) => {
    const status = batch.status?.toLowerCase();
    if (status === "active" || status === "expired") return status;
    if (!batch.expireDate) return "active";
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    return batch.expireDate.slice(0, 10) < today ? "expired" : "active";
  };

  const totalStudent = batchState.reduce((acc, batch) => acc + (batch.students?.length || 0), 0);
  const totalTeacher = batchState.reduce((acc, batch) => acc + (batch.teachers?.length || 0), 0);
  const totalActive = batchState.filter((batch) => getBatchStatus(batch) === "active").length;
  const filteredBatches = useMemo(() => batchState.filter((batch) => {
    const matchesSearch = batch.batchName?.toLowerCase().includes(search.trim().toLowerCase());
    return matchesSearch && (statusFilter === "all" || getBatchStatus(batch) === statusFilter);
  }), [batchState, search, statusFilter]);
  const pageCount = Math.max(1, Math.ceil(filteredBatches.length / pageSize));
  const visibleBatches = filteredBatches.slice((page - 1) * pageSize, page * pageSize);

  const deleteBatch = async (id) => {
    try {
      await axios.delete(`${Backend.DELTE_BATCH}/${id}`);
      setBatchState((batches) => batches.filter((batch) => batch._id !== id));
      setOpenMenu(null);
    }
    catch (err) {
      console.log('something is error')
      alert("Something is error")
    }
  }
  return (
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f8f9fa", overflowX: "hidden" }}>
      <div className="app-layout" style={{ width: "100%", minHeight: "100vh" }}>
        <AppSidebar user={user} role="admin" activePath="/batch-management" />

        {/* </aside> */}
        <main className="flex-grow-1 p-3">
          {/* <section className="mt-4">
            <h1>Batch Management</h1>
            <p>Manage student batches and teacher assignments</p>
          </section> */}
          <section className="stats-card-grid mt-3">
            <StatsCard title="Total Batches" value={batchState.length} icon={Boxes} color="blue" />
            <StatsCard title="Active Batches" value={totalActive} icon={CircleCheck} color="green" />
            <StatsCard title="Total Students" value={totalStudent} icon={GraduationCap} color="violet" />
            <StatsCard title="Available Teachers" value={totalTeacher} icon={BriefcaseBusiness} color="amber" />
          </section>
          <main className="batch-management">
            <header className="batch-toolbar">
              <div className="batch-page-title">
                <span className="batch-title-icon"><Boxes size={22} /></span>
                <div><h2>All Batches</h2><p>View and manage all your batches</p></div>
              </div>
              <div className="batch-controls">
                <label className="batch-search">
                  <Search size={18} aria-hidden="true" />
                  <input type="search" placeholder="Search batches..." value={search} aria-label="Search batches" onChange={(event) => { setSearch(event.target.value); setPage(1); }} />
                </label>
                <label className="batch-status-select">
                  <span className="batch-sr-only">Filter batches by status</span>
                  <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }}>
                    <option value="all">All Status</option><option value="active">Active</option><option value="expired">Expired</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </label>
                <Link to="/create-batch" className="batch-create-button"><Plus size={18} />Create Batch</Link>
              </div>
            </header>

            <section className="batch-list" aria-label="Batches">
              {visibleBatches.map((batch, index) => {
                const status = getBatchStatus(batch);
                const detailsOpen = openDetails === batch._id;
                return (
                  <article className="batch-row" key={batch._id || `${batch.batchName}-${index}`}>
                    <div className={`batch-mark batch-mark-${index % 3}`}><GraduationCap size={30} /></div>
                    <div className="batch-summary">
                      <div className="batch-name-line"><h3>{batch.batchName}</h3><span className={`batch-status is-${status}`}>{status === "active" ? "Active" : "Expired"}</span></div>
                      <div className="batch-dates">
                        <span><CalendarDays size={15} />Launch Date: {batch.launchDate?.slice(0, 10) || "Not set"}</span>
                        <span><CalendarDays size={15} />Expire Date: {batch.expireDate?.slice(0, 10) || "Not set"}</span>
                      </div>
                    </div>
                    <div className="batch-metrics">
                      <div className="batch-metric students"><UsersRound size={23} /><strong>{batch.students?.length || 0}</strong><span>Students</span></div>
                      <div className="batch-metric teachers"><UserRound size={23} /><strong>{batch.teachers?.length || 0}</strong><span>Teachers</span></div>
                    </div>
                    <div className="batch-actions">
                      <button type="button" className={`batch-details-button${detailsOpen ? " is-open" : ""}`} onClick={() => setOpenDetails(detailsOpen ? null : batch._id)} aria-expanded={detailsOpen}><Eye size={17} />{detailsOpen ? "Hide Details" : "View Details"}</button>
                      <div className="batch-menu-wrap">
                        <button type="button" className="batch-menu-button" aria-label={`Actions for ${batch.batchName}`} aria-expanded={openMenu === batch._id} onClick={() => setOpenMenu(openMenu === batch._id ? null : batch._id)}><MoreVertical size={19} /></button>
                        {openMenu === batch._id && <div className="batch-menu"><button type="button" onClick={() => deleteBatch(batch._id)}>Delete batch</button></div>}
                      </div>
                    </div>
                    {detailsOpen && <div className="batch-expanded-details"><span><strong>Batch:</strong> {batch.batchName}</span><span><strong>Status:</strong> {status === "active" ? "Active" : "Expired"}</span><span><strong>Students:</strong> {batch.students?.length || 0}</span><span><strong>Teachers:</strong> {batch.teachers?.length || 0}</span></div>}
                  </article>
                );
              })}
              {visibleBatches.length === 0 && <div className="batch-empty-state"><span>{batchState.length ? "No batches match your search or status filter." : "No batches have been created yet."}</span>{batchState.length > 0 && <button type="button" onClick={() => { setSearch(""); setStatusFilter("all"); setPage(1); }}>Clear filters</button>}</div>}
            </section>

            <footer className="batch-pagination">
              <span>Showing {filteredBatches.length ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, filteredBatches.length)} of {filteredBatches.length} batches</span>
              <div className="batch-pagination-actions">
                <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}><ChevronLeft size={18} /></button>
                <span className="batch-page-number">{page}</span>
                <button type="button" aria-label="Next page" disabled={page >= pageCount} onClick={() => setPage((current) => current + 1)}><ChevronRight size={18} /></button>
                <label className="batch-page-size">Show <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} aria-label="Batches per page"><option value={5}>5</option><option value={10}>10</option><option value={20}>20</option></select><span>per page</span></label>
              </div>
            </footer>
          </main>
        </main>
      </div >
    </div >
  );
}

export default BatchManage;
