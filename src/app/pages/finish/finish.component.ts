import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatisticService } from '../../services/statistic.service';
import { QuizStatistics } from '../../interfaces/statistics.interface';
import { TimePipe } from '../../pipes/time.pipe';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [TimePipe, RouterLink],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss',
})
export class FinishComponent implements OnInit {
  private statisticService = inject(StatisticService);
  statistics!: QuizStatistics;

  ngOnInit(): void {
    this.statistics = this.statisticService.getStatisticData();
  }
}
